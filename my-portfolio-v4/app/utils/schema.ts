import { z } from "zod";

const nameUrlAndImgSrc = z.object({
  name: z.string(),
  url: z.string(),
  imgSrc: z.string(),
});
const nameUrlAndImgSrcArraySchema = z.array(nameUrlAndImgSrc);
export type mediaArrayType = z.infer<typeof nameUrlAndImgSrcArraySchema>;

const nameAndImgSrc = z.object({ name: z.string(), imgSrc: z.string() });
const nameAndImgSrcArraySchema = z.array(nameAndImgSrc);
export type skillsArrayType = z.infer<typeof nameAndImgSrcArraySchema>;

export const mediaAndSkillsDataSchema = z.object({
  media: nameUrlAndImgSrcArraySchema,
  skills: nameAndImgSrcArraySchema,
});

const urlTitleAndImgSrc = z.object({
  url: z.string(),
  title: z.string(),
  imgSrc: z.string(),
});
const urlTitleAndImgSrcArray = z.array(urlTitleAndImgSrc);
export type codePenArrayType = z.infer<typeof urlTitleAndImgSrcArray>;

const urlTitleImgSrcAndDescription = z.object({
  url: z.string(),
  title: z.string(),
  imgSrc: z.string(),
  description: z.string(),
});
export const urlTitleImgSrcAndDescriptionArraySchema = z.array(
  urlTitleImgSrcAndDescription,
);
export type urlTitleImgSrcAndDescriptionArrayType = z.infer<
  typeof urlTitleImgSrcAndDescriptionArraySchema
>;
export const searchSchema = z.object({
  key: z.string(),
  data: urlTitleImgSrcAndDescriptionArraySchema,
});

const urlImgSrcDescriptionAndOrder = z.object({
  url: z.string(),
  imgSrc: z.string(),
  description: z.string(),
  order: z.number(),
});

const gitHubSchema = z
  .object({ url: z.string(), name: z.string() })
  .or(z.object({ items: z.array(urlTitleImgSrcAndDescription) }));
const githubArraySchema = z.array(gitHubSchema);
export type githubArrayType = z.infer<typeof githubArraySchema>;

const cloudSchema = z.record(z.string(), z.array(urlImgSrcDescriptionAndOrder));
export type cloudType = z.infer<typeof cloudSchema>;

export const dataSchema = z.object({
  info: z.object({
    about: z.string(),
    media: nameUrlAndImgSrcArraySchema,
    skills: nameAndImgSrcArraySchema,
    codePen: urlTitleAndImgSrcArray,
    gitHub: githubArraySchema,
    cloud: cloudSchema,
  }),
});

export const contextSchema = z.object({
  env: z.object({ RESEND_API_KEY: z.string() }),
});
