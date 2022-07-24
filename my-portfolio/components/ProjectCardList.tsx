import React from "react";
import { NextPage } from "next";
import {
  consolidatedDataType,
} from "../models/dataType";
import ProjectCard from "./ProjectCard";

const ProjectCardList: NextPage<projectCardListPropsType> = ({
  data
}) => {
  return (
    <div className="p-1 grid grid-cols-1 xl:grid-cols-2 gap-3 items-center xl:items-stretch justify-center">
      {data.map(el =>
        <ProjectCard data={el} title={el.title} key={el.url}></ProjectCard>
      )
      }
    </div>
  );
};
type projectCardListPropsType = {
  data: consolidatedDataType[];
};
export default React.memo(ProjectCardList);
