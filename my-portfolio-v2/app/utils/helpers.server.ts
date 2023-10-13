import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";
import { z } from "zod";
import {
  type cloudType,
  dataSchema,
  type urlTitleImgSrcAndDescriptionArrayType,
} from "./schema";

const envSchema = z.object({
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_USER: z.string(),
  REDIS_PWD: z.string(),
});

const env = envSchema.parse(process.env);
const redisStorage = createStorage({
  driver: redisDriver({
    url: `reds://${env.REDIS_USER}:${env.REDIS_PWD}@${env.REDIS_HOST}:${env.REDIS_PORT}`,
    maxRetriesPerRequest: 1,
    commandTimeout: 500,
    connectTimeout: 500,
  }),
});

export async function getData() {
  return await redisStorage.getItem<z.infer<typeof dataSchema>>(
    "portfolio_data",
  );
}

export function getCloudConsolidatedData(allCloudData: cloudType) {
  let consolidated: urlTitleImgSrcAndDescriptionArrayType = [];
  const cloudflare = allCloudData["cloudflare"];
  const firebase = allCloudData["firebase"];
  const netlify = allCloudData["netlify"];
  const vercel = allCloudData["vercel"];

  cloudflare
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .forEach((el) => {
      if (el.imgSrc)
        consolidated.push({
          imgSrc: el.imgSrc,
          url: el.url || "",
          description: el.description || "",
          title: "CLOUDFLARE",
        });
    });
  firebase
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .forEach((el) => {
      if (el.imgSrc)
        consolidated.push({
          imgSrc: el.imgSrc,
          url: el.url || "",
          description: el.description || "",
          title: "FIREBASE",
        });
    });
  netlify
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .forEach((el) => {
      if (el.imgSrc)
        consolidated.push({
          imgSrc: el.imgSrc,
          url: el.url || "",
          description: el.description || "",
          title: "NETLIFY",
        });
    });
  vercel
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .forEach((el) => {
      if (el.imgSrc)
        consolidated.push({
          imgSrc: el.imgSrc,
          url: el.url || "",
          description: el.description || "",
          title: "VERCEL",
        });
    });
  return consolidated;
}
