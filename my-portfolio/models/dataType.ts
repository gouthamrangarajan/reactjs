export default interface dataType {
  info: {
    about: string;
    media: mediaType[];
    codePen: codePenType[];
    gitHub: gitHubType[];
    cloud: cloudType;
  };
}
export interface mediaType {
  name: string;
  url: string;
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
