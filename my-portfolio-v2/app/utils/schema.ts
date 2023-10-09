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
const urlTitleImgSrcAndDescription = z.object({
  url: z.string(),
  title: z.string(),
  imgSrc: z.string(),
  description: z.string(),
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
const cloudSchema = z.record(z.string(), z.array(urlImgSrcDescriptionAndOrder));

export const dataSchema = z.object({
  info: z.object({
    about: z.string(),
    media: nameUrlAndImgSrcArraySchema,
    skills: nameAndImgSrcArraySchema,
    codePen: z.array(urlTitleAndImgSrc),
    github: z.array(gitHubSchema),
    cloud: cloudSchema,
  }),
});
