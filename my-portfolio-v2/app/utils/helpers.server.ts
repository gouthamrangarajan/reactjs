import {
  type cloudType,
  dataSchema,
  type urlTitleImgSrcAndDescriptionArrayType,
  type githubArrayType,
  type codePenArrayType,
} from "./schema";
import data from "./../../public/data.json";

export function getData() {
  return dataSchema.parse(data);
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
