import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";
import { z } from "zod";
import {
  type cloudType,
  dataSchema,
  type urlTitleImgSrcAndDescriptionArrayType,
  type githubArrayType,
  type codePenArrayType,
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
    maxRetriesPerRequest: 3,
    commandTimeout: 500,
    connectTimeout: 500,
  }),
});

export async function getData() {
  const data =
    await redisStorage.getItem<z.infer<typeof dataSchema>>("portfolio_data_v2");
  return data;
}

export function getCloudConsolidatedData(allCloudData: cloudType) {
  let consolidated: urlTitleImgSrcAndDescriptionArrayType = [];
  const cloudflare = allCloudData["cloudflare"];
  const firebase = allCloudData["firebase"];
  const netlify = allCloudData["netlify"];
  const vercel = allCloudData["vercel"];
  const fly = allCloudData["fly"];

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
  fly
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .forEach((el) => {
      if (el.imgSrc)
        consolidated.push({
          imgSrc: el.imgSrc,
          url: el.url || "",
          description: el.description || "",
          title: "FLY",
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

export function getRepoConsolidatedData({
  gitHub,
  codePen,
}: {
  gitHub: githubArrayType;
  codePen: codePenArrayType;
}) {
  let consolidated: urlTitleImgSrcAndDescriptionArrayType = [];
  gitHub.forEach((el) => {
    if ("items" in el) {
      el.items.forEach((item) => {
        if (item.imgSrc)
          consolidated.push({
            imgSrc: item.imgSrc,
            url: item.url || "",
            description: item.description || "",
            title: "GITHUB",
          });
      });
    }
  });
  codePen.forEach((el) => {
    if (el.imgSrc)
      consolidated.push({
        imgSrc: el.imgSrc,
        url: el.url || "",
        description: "",
        title: "CODEPEN",
      });
  });
  return consolidated;
}
