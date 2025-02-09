import { z } from "zod";
import type { Route } from "./+types";

export async function loaderFn({ context }: Route.LoaderArgs) {
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
    }),
  });
  const parsedData = schema.parse(JSON.parse(data!));
  const sortedData = parsedData.info.demos.all
    .sort((a, b) => a.order - b.order)
    .filter((demo) => demo.display);
  return { demos: sortedData };
}
