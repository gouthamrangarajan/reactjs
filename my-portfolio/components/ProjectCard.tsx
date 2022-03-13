import { NextPage } from "next";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import {
  cloudArrayType,
  codePenType,
  githubItemType,
  projectType,
} from "../models/dataType";

const ProjectCard: NextPage<projectCardPropsType> = ({ el, type }) => {
  let cloudEl = el as cloudArrayType;
  let githubEl = el as githubItemType;
  let codePenEl = el as codePenType;
  let {color}=useContext(ThemeContext);
  return (
    <div
      className={`flex flex-col shadow-2xl rounded-lg cursor-pointer w-[400px] md:w-[600px]
      transition duration-300 hover:transform hover:-translate-y-1 flex-shrink-0 peer 
       peer-hover:translate-x-40 md:peer-hover:translate-x-64 ease-in-out 
       ${color=="DARK"?" bg-slate-700 border-t-2 border-r-2 border-l-2 border-slate-600":"bg-white"}
       ${
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
          className={`text-lg font-semibold underline ${color=="DARK"?"text-gray-100 ":"text-indigo-600"}`}
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
          <p className={`p-1 text-sm font-semibold ${color=="DARK"?"text-sky-300":"text-gray-600"}`}>
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
