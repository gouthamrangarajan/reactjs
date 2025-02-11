import { z } from "zod";
import type { Route } from "./+types";

export async function loaderFn({ context, request }: Route.LoaderArgs) {
  const { env } = context.cloudflare;
  const data = await env.my_portfolio_v2.get("data");
  const schema = z.object({
    info: z.object({
      demos: z.object({
        all: z.array(
          z.object({
            order: z.number(),
            title: z.string(),
            imgSrc: z.string(),
            url: z.string(),
            description: z.string(),
            tags: z.array(z.string()),
            service: z.string(),
            display: z.boolean(),
            imgBadgeLightMode: z.boolean().optional(),
          }),
        ),
      }),
      filters: z.array(z.string()),
    }),
  });
  const parsedData = schema.parse(JSON.parse(data!));
  let sortedData = parsedData.info.demos.all
    .sort((a, b) => a.order - b.order)
    .filter((demo) => demo.display);
  const url = new URL(request.url);
  let category = url.searchParams.get("category")?.toString().trim();
  let searchTxt = url.searchParams
    .get("srchTxt")
    ?.toString()
    .trim()
    .toLowerCase();
  if (category && category.toLowerCase() !== "all projects") {
    category =
      category.slice(0, 1).toUpperCase() + category.slice(1).toLowerCase();
    sortedData = sortedData.filter(
      (demo) => demo.tags.includes(category!) || demo.service === category,
    );
  }
  if (searchTxt) {
    sortedData = sortedData.filter((demo) => {
      return (
        demo.title.toLowerCase().includes(searchTxt) ||
        demo.tags.join(" ").toLowerCase().includes(searchTxt) ||
        demo.description.toLowerCase().includes(searchTxt) ||
        demo.service.toLowerCase().includes(searchTxt)
      );
    });
  }
  return { demos: sortedData, filters: parsedData.info.filters };
}
