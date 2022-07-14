import React from "react";

export default interface dataType {
  info: {
    about: string;
    media: mediaType[];
    codePen: codePenType[];
    gitHub: gitHubType[];
    cloud: cloudType;
    skills: skillType[];
  };
}
export interface mediaType {
  name: string;
  url: string;
  imgSrc: string;
}
export interface codePenType {
  url: string;
  imgSrc: string;
  title: string;
}
export interface gitHubType {
  name?: string;
  url?: string;
  items?: githubItemType[];
}
export interface cloudType {
  firebase: cloudArrayType[];
  azure: cloudArrayType[];
  netlify: cloudArrayType[];
  cloudflare: cloudArrayType[];
}
export interface cloudArrayType {
  order?: number;
  imgSrc?: string;
  description?: string;
  url?: string;
  other?: cloudArrayType[];
}
export interface githubItemType {
  imgSrc: string;
  description: string;
  url: string;
  title: string;
}

export type projectType = "CLOUD" | "GITHUB" | "CODEPEN";
export interface skillType {
  imgSrc: string;
  name: string;
}
export type consolidatedDataType = {
  imgSrc: string;
  url: string;
  description?: string;
  title: string;
}
export type cloudPageContextType = {
  cloudProviderFilter: string;
  applicationTypeFilter: string;
  textFilter: string;
}
export type repoPageContextType = {
  repoFilter: string;
  textFilter: string;
}
export type reducerActionType<T> = {
  name: string;
  payload?: T;
}

export type appContextType = {
  scrollEl: React.MutableRefObject<HTMLElement | undefined> | undefined;
}