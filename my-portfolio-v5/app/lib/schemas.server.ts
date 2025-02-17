import { z } from "zod";

export const projectsSchema = z.object({
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

export const homePageSchema = z.object({
  info: z.object({
    title: z.string(),
    subTitle: z.string(),
    media: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        imgSrc: z.string(),
        height: z.number(),
        width: z.number(),
      }),
    ),
    demos: z.object({
      featured: z.array(
        z.object({
          order: z.number(),
          title: z.string(),
          imgSrc: z.string(),
          url: z.string(),
          description: z.string(),
          tags: z.array(z.string()),
        }),
      ),
    }),
  }),
});

export const srchCacheSchema = z.object({
  titles: z.array(z.string()),
});
