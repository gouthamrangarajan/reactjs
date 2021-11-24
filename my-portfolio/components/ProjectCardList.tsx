import { NextComponentType, NextPageContext } from "next";
import {
  cloudArrayType,
  codePenType,
  githubItemType,
  projectType,
} from "../models/dataType";
import ProjectCard from "./ProjectCard";

const ProjectCardList: NextComponentType<
  NextPageContext,
  {},
  projectCardListPropsType
> = ({ info, type }) => {
  let cloudArrayTypeInfo: cloudArrayType[] = [];
  let githubItemTypeInfo: githubItemType[] = [];
  let codePenTypeInfo: codePenType[] = [];

  switch (type) {
    case "GITHUB": {
      githubItemTypeInfo = info as githubItemType[];
      break;
    }
    case "CODEPEN": {
      codePenTypeInfo = info as codePenType[];
      break;
    }
    default: {
      cloudArrayTypeInfo = info as cloudArrayType[];
      break;
    }
  }

  return (
    <>
      {cloudArrayTypeInfo.length > 0 &&
        cloudArrayTypeInfo
          .filter((el) => el.url != undefined)
          .sort((a, b) => (a.order && b.order && a.order > b.order ? 1 : -1))
          .map((el) => (
            <ProjectCard el={el} key={el.url} type={type}></ProjectCard>
          ))}
      {cloudArrayTypeInfo.length > 0 &&
        cloudArrayTypeInfo
          .filter((el) => el.other != undefined)
          .map(
            (el) =>
              el.other &&
              el.other
                .sort((a, b) =>
                  a.order && b.order && a.order > b.order ? 1 : -1
                )
                .map((othEl) => (
                  <ProjectCard
                    el={othEl}
                    key={othEl.url}
                    type={type}
                  ></ProjectCard>
                ))
          )}
      {githubItemTypeInfo.length > 0 &&
        githubItemTypeInfo.map((el) => (
          <ProjectCard el={el} key={el.url} type={type}></ProjectCard>
        ))}
      {codePenTypeInfo.length > 0 &&
        codePenTypeInfo.map((el) => (
          <ProjectCard el={el} key={el.url} type={type}></ProjectCard>
        ))}
    </>
  );
};
type projectCardListPropsType = {
  info: cloudArrayType[] | githubItemType[] | codePenType[];
  type?: projectType;
};
export default ProjectCardList;
