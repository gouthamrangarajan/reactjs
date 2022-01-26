import { NextPage } from "next";
import {
  cloudArrayType,
  codePenType,
  githubItemType,
  projectType,
} from "../models/dataType";

const ProjectCard: NextPage<projectCardPropsType> = ({ el, type }) => {
  const cloudEl = el as cloudArrayType;
  const githubEl = el as githubItemType;
  const codePenEl = el as codePenType;
  return (
    <div
      className={`flex flex-col bg-white shadow-2xl rounded-lg cursor-pointer w-[400px] md:w-[600px]
      transition duration-300 hover:transform hover:-translate-y-1 flex-shrink-0 peer 
       peer-hover:translate-x-40 md:peer-hover:translate-x-64 ease-in-out ${
         type == "GITHUB" ? "h-[300px] md:h-[425px] overflow-hidden" : ""
       }`}
      key={el.url}
    >
      <div
        className={`flex flex-col  py-1 px-3 lg:py-2 xl:py-4 lg:px-4 xl:px-6 ${
          type != "CODEPEN" ? "h-[9rem]" : ""
        }`}
      >
        <a
          className="text-lg text-indigo-600 font-semibold underline"
          target="_blank"
          rel="noreferrer"
          href={el.url}
        >
          {type == "GITHUB" || type == "CODEPEN"
            ? type == "GITHUB"
              ? githubEl.title
              : codePenEl.title
            : el.url}
        </a>
        {type != "CODEPEN" && (
          <p className="p-1 text-sm text-gray-600 font-semibold">
            {type == "GITHUB" ? githubEl.description : cloudEl.description}
          </p>
        )}
      </div>
      <img
        src={el.imgSrc || ""}
        alt={`Image for ${el.url}`}
        className="rounded-b-lg object-contain"
      ></img>
    </div>
  );
};
type projectCardPropsType = {
  el: cloudArrayType | githubItemType | codePenType;
  type?: projectType;
};
export default ProjectCard;
