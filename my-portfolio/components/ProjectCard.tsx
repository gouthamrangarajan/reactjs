import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next"
import { consolidatedDataType } from "../models/dataType"
import { staggerParent } from "../utils/animationVariants";
import Img from "./ProjectCardImg";

const ProjectCard: NextPage<projectCardPropsType> = ({ data, title }) => {
  return (
    <AnimatePresence>
      <motion.div className="shadow-2xl rounded-xl overflow-hidden flex flex-col flex-shrink-0 
                  bg-slate-800 relative w-full"
        key={data.url}
        variants={staggerParent}
        initial="hidden" animate="show"
        layout="position">
        <motion.div className="py-4 px-6 flex flex-col w-full" layout="position">
          <motion.span className="font-bold text-xl text-pink-400" key={title} layout="position">
            {title}
          </motion.span>
          <motion.a className="font-semibold text-lg text-ellipsis text-sky-400 underline"
            href={data?.url} key={data?.url} target="_blank" rel="noreferrer" layout="position">
            {data?.url}
          </motion.a>
          <motion.p className=" text-sky-200 p-2 xl:h-12"
            key={data?.description} layout="position">
            {data?.description}
          </motion.p>
        </motion.div>
        <motion.div className={`w-full h-full overflow-hidden`} layout="position">
          {data?.imgSrc &&
            <Img src={data.imgSrc} alt={`Image for ${data.description}`}></Img>}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
type projectCardPropsType = {
  data: consolidatedDataType;
  title?: string
}
export default ProjectCard