import type { Route } from "./+types";
import { getEmbedding } from "~/lib/openAIAPI.server";
import { queryData, upsertData } from "~/lib/vectorDb/pinecone.server";
import { projectsSchema, srchCacheSchema } from "~/lib/schemas.server";

export async function loaderFn({ context, request }: Route.LoaderArgs) {
  const { env } = context.cloudflare;
  const data = await env.my_portfolio_v2.get("data");
  const parsedData = projectsSchema.parse(JSON.parse(data!));
  // await getEmbeddingAndupsertToPinecone({
  //   demos: parsedData.info.demos.all,
  //   OPENAI_API_EMBEDDING_URL: env.OPENAI_API_EMBEDDING_URL,
  //   OPENAI_API_EMBEDDING_MODEL: env.OPENAI_API_EMBEDDING_MODEL,
  //   OPENAI_API_KEY: env.OPENAI_API_KEY,
  //   PINECONE_API_KEY: env.PINECONE_API_KEY,
  //   PINECONE_HOST_URL: env.PINECONE_HOST_URL,
  // });
  let respData = parsedData.info.demos.all
    .sort((a, b) => a.order - b.order)
    .filter((demo) => demo.display);
  const url = new URL(request.url);
  let category = url.searchParams.get("category")?.toString().trim();
  const searchTxt = url.searchParams.get("srchTxt")?.toString().trim();
  if (category && category.toLowerCase() !== "all projects") {
    category =
      category.slice(0, 1).toUpperCase() + category.slice(1).toLowerCase();
    respData = respData.filter(
      (demo) => demo.tags.includes(category!) || demo.service === category,
    );
  }
  let vectorSearchData = [...respData];
  let ignoreVectorSearch = false;
  if (searchTxt) {
    try {
      let ftedTitles: Array<string> = [];
      const cachedResults = await env.my_portfolio_v2.get(
        `search_${searchTxt}`,
      );
      if (cachedResults != null) {
        ftedTitles = srchCacheSchema.parse(JSON.parse(cachedResults)).titles;
      } else {
        const embeddingForSrchTxt = await getEmbedding({
          textToEmbed: searchTxt,
          apiKey: env.OPENAI_API_KEY,
          apiUrl: env.OPENAI_API_EMBEDDING_URL,
          model: env.OPENAI_API_EMBEDDING_MODEL,
        });
        let vectorResp = await queryData({
          vectors: embeddingForSrchTxt,
          hostUrl: env.PINECONE_HOST_URL,
          apiKey: env.PINECONE_API_KEY,
          topK: env.PINECONE_TOPK,
        });
        vectorResp = vectorResp.filter(
          (item) => item.score > env.PINECONE_FILTER_SCORE,
        );
        ftedTitles = vectorResp.map((item) => item.id);
        await env.my_portfolio_v2.put(
          `search_${searchTxt}`,
          JSON.stringify({ titles: ftedTitles }),
        );
      }
      vectorSearchData = respData.filter((demo) =>
        ftedTitles.includes(demo.title),
      );
      if (vectorSearchData.length === 0) {
        ignoreVectorSearch = true;
      }
    } catch (err) {
      console.log("error in search using vector search", err);
      ignoreVectorSearch = true;
    }
  }
  if (ignoreVectorSearch) {
    respData = respData.filter((demo) =>
      demo.title.toLowerCase().includes(searchTxt!.toLowerCase()),
    );
  } else {
    respData = vectorSearchData;
  }
  return { demos: respData, filters: parsedData.info.filters };
}

async function getEmbeddingAndupsertToPinecone({
  demos,
  OPENAI_API_EMBEDDING_MODEL,
  OPENAI_API_EMBEDDING_URL,
  OPENAI_API_KEY,
  PINECONE_API_KEY,
  PINECONE_HOST_URL,
}: {
  demos: {
    title: string;
    url: string;
    description: string;
    tags: string[];
    service: string;
  }[];
  OPENAI_API_EMBEDDING_MODEL: string;
  OPENAI_API_EMBEDDING_URL: string;
  OPENAI_API_KEY: string;
  PINECONE_API_KEY: string;
  PINECONE_HOST_URL: string;
}) {
  for (let idx = 0; idx < demos.length; idx++) {
    const demo = demos[idx];
    const vectorTxt = `${demo.title} ${demo.description} ${demo.url} ${demo.tags.join(" ")} ${demo.service}`;
    const embeddingForDemo = await getEmbedding({
      textToEmbed: vectorTxt,
      apiKey: OPENAI_API_KEY,
      apiUrl: OPENAI_API_EMBEDDING_URL,
      model: OPENAI_API_EMBEDDING_MODEL,
    });
    await upsertData({
      vectors: embeddingForDemo,
      id: demo.title,
      hostUrl: PINECONE_HOST_URL,
      apiKey: PINECONE_API_KEY,
    });
  }
}
