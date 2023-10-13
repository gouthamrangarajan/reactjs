import React from "react";
import ProjectCard from "./ProjectCard";
import { type urlTitleImgSrcAndDescriptionArrayType } from "~/utils/schema";

const ProjectCardList = ({
  data,
}: {
  data: urlTitleImgSrcAndDescriptionArrayType;
}) => {
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-3 p-1 xl:grid-cols-2 xl:items-stretch">
      {data.map((el) => (
        <ProjectCard data={el} title={el.title} key={el.url}></ProjectCard>
      ))}
    </div>
  );
};

export default React.memo(ProjectCardList);
