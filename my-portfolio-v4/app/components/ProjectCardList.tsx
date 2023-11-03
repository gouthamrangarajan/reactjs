import React from "react";
import ProjectCard from "./ProjectCard";
import { type urlTitleImgSrcAndDescriptionArrayType } from "~/utils/schema";

const ProjectCardList = ({
  data,
}: {
  data: urlTitleImgSrcAndDescriptionArrayType;
}) => {
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-3 p-1 xl:grid-cols-2">
      {data.map((el, ind) => (
        <ProjectCard
          data={el}
          title={el.title}
          key={el.url}
          imgAnimate={ind + 2 < data.length}
        ></ProjectCard>
      ))}
    </div>
  );
};

export default React.memo(ProjectCardList);
