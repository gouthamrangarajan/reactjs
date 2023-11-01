import { motion } from "framer-motion";
import Img from "./ProjectCardImg";

export default function ProjectCard({
  data,
  title,
  index,
}: {
  title: string;
  data: { url: string; description?: string; imgSrc: string };
  index: number;
}) {
  return (
    <motion.div
      className={`relative flex w-full flex-shrink-0 flex-col overflow-hidden 
                  rounded-xl bg-slate-800 shadow-2xl `}
      key={data.url}
      layout="position"
    >
      <motion.div className="flex w-full flex-col px-6 py-4" layout="position">
        <motion.span
          className="text-xl font-bold text-pink-400"
          key={title}
          layout="position"
        >
          {title}
        </motion.span>
        <motion.a
          className="text-ellipsis text-lg font-semibold text-sky-400 underline"
          href={data.url}
          key={data.url}
          target="_blank"
          rel="noreferrer"
          layout="position"
        >
          {data?.url}
        </motion.a>
        <motion.p
          className=" p-2 text-sky-200 xl:h-12"
          key={data?.description}
          layout="position"
        >
          {data?.description}
        </motion.p>
      </motion.div>
      <motion.div className={`h-full w-full overflow-hidden`} layout="position">
        <Img
          src={data.imgSrc}
          alt={`Image for ${data.description}`}
          index={index}
        ></Img>
      </motion.div>
    </motion.div>
  );
}
