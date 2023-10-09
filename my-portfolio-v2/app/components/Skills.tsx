import { motion } from "framer-motion";
import { staggerChild, staggerParent } from "../utils/animationVariants";
import { type skillsArrayType } from "~/utils/schema";

export default function Skills({ data }: { data: skillsArrayType }) {
  return (
    <div className="w-full">
      <div className="flex w-full flex-shrink-0 flex-col">
        <span className="w-full text-center text-3xl font-semibold italic tracking-widest text-sky-700">
          Skills
        </span>
        <motion.div
          className="mx-auto flex max-w-6xl flex-shrink-0 flex-wrap items-center justify-center gap-4 px-3 py-1"
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          {data.map((el) => (
            <motion.div
              className={`rounded-xl p-1 
                                                ${
                                                  [
                                                    "NextJs",
                                                    "Azure Functions",
                                                    "Remix",
                                                  ].includes(el.name)
                                                    ? "h-32 w-32 pt-8"
                                                    : "h-24 w-24"
                                                }`}
              key={el.name}
              variants={staggerChild}
            >
              <img
                src={el.imgSrc}
                key={el.name}
                alt={el.name}
                className="cursor-pointer rounded-xl object-contain"
                title={el.name}
              ></img>
            </motion.div>
          ))}
          <motion.span
            className="rounded bg-sky-600 px-3 py-1 font-semibold text-white"
            variants={staggerChild}
            key="more"
          >
            AND MANY MORE...
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
