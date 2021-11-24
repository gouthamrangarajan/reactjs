import { ImageLoaderProps } from "next/image";
import {
  cloudArrayType,
  cloudType,
  githubItemType,
  gitHubType,
} from "../models/dataType";

export const getProjects = (
  cloudInfo: cloudType,
  key: string
): cloudArrayType[] => {
  return cloudInfo[key as keyof cloudType];
};

export const getProjectsLength = (
  cloudInfo: cloudType,
  key: string
): number => {
  let els = cloudInfo[key as keyof cloudType];
  let length = els.filter((el) => el.url).length;
  els.forEach((el) => {
    if (el.other) length += el.other.length;
  });
  return length;
};

export const getGitHubProjects = (
  githubinfo: gitHubType[]
): githubItemType[] => {
  let ret: githubItemType[] = [];
  githubinfo
    .filter((el) => el.items)
    .forEach((ftEl) => {
      ftEl.items?.forEach((itEl) => ret.push(itEl));
    });
  return ret;
};

export const imgLoader = ({ src }: ImageLoaderProps) => {
  return `${src}`;
};
