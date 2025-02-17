import { z } from "zod";

export const upsertData = async ({
  vectors,
  id,
  hostUrl,
  apiKey,
}: {
  vectors: Array<number>;
  id: string;
  hostUrl: string;
  apiKey: string;
}) => {
  const respRaw = await fetch(`${hostUrl}/vectors/upsert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": `${apiKey}`,
    },
    body: JSON.stringify({
      vectors: [{ id: id, values: vectors }],
    }),
  });
  const resp = await respRaw.json();
  if ((resp as any).upsertedCount === 1) {
    console.log("pinecone upsert success");
  } else {
    console.log("pinecone upsert failed", JSON.stringify(resp));
  }
};

export const queryData = async ({
  vectors,
  hostUrl,
  apiKey,
  topK,
}: {
  vectors: Array<number>;
  hostUrl: string;
  apiKey: string;
  topK: number;
}) => {
  const respRaw = await fetch(`${hostUrl}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": `${apiKey}`,
    },
    body: JSON.stringify({
      vector: vectors,
      includeValues: false,
      topK,
    }),
  });
  const resp = await respRaw.json();
  const schema = z.object({
    matches: z.array(z.object({ id: z.string(), score: z.number() })),
  });
  const parsedResp = schema.parse(resp);
  return parsedResp.matches;
};
