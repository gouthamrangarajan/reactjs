import React from "react";
import { motion } from "framer-motion";
import { NextPage } from "next";
import {
  consolidatedDataType,
} from "../models/dataType";
import ProjectCard from "./ProjectCard";
import { staggerParent, staggerChild } from "../utils/animationVariants";

const ProjectCardList: NextPage<projectCardListPropsType> = ({
  data
}) => {
  return (
    <motion.div className="p-1 grid grid-cols-1 xl:grid-cols-2 gap-3 items-center xl:items-stretch justify-center"
      variants={staggerParent} initial="hidden" animate="show" layout>
      {data.map(el =>
      (<motion.div className="w-full" key={el.url} variants={staggerChild} layout="position">
        <ProjectCard data={el} title={el.title}></ProjectCard>
      </motion.div>)
      )
      }
    </motion.div>
  );
};
type projectCardListPropsType = {
  data: consolidatedDataType[];
};
export default React.memo(ProjectCardList);
