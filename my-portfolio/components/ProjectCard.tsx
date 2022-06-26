import { NextPage } from "next"
import { consolidatedDataType } from "../models/dataType"
import Img from "./ProjectCardImg";

const ProjectCard: NextPage<projectCardPropsType> = ({ data, title }) => {
  return (
    <div className="shadow-2xl rounded-xl overflow-hidden flex flex-col flex-shrink-0 bg-slate-800 relative w-full">
      <div className="py-4 px-6 flex flex-col w-full">
        <span className="font-bold text-xl text-pink-400" key={title}>
          {title}
        </span>
        <a className="font-semibold text-lg text-ellipsis text-sky-400 underline"
          href={data?.url} key={data?.url} target="_blank" rel="noreferrer">
          {data?.url}
        </a>
        <p className=" text-sky-200 p-2 xl:h-12"
          key={data?.description}>
          {data?.description}
        </p>
      </div>
      <div className={`w-full h-full overflow-hidden`}>
        {data?.imgSrc &&
          <Img src={data.imgSrc} alt={`Image for ${data.description}`}></Img>}
      </div>
    </div>
  )
}
type projectCardPropsType = {
  data: consolidatedDataType;
  title?: string
}
export default ProjectCard