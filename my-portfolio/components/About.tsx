import { motion } from "framer-motion";
import type { NextPage } from "next";
import { staggerChild } from "../utils/animationVariants";

const About: NextPage<aboutPropType> = ({ about }) => {  
  return (
    <motion.div
      className="w-full flex items-center justify-center -mt-6 flex-shrink-0"
      key={1}
      variants={staggerChild}
    >
      <div
        className={`shadow-2xl w-11/12 lg:w-8/12 xl:w-6/12 py-1 px-3 lg:py-2 lg:px-4 
        xl:py-4 xl:px-6 rounded-lg  font-semibold flex flex-col space-y-2 dark:bg-slate-700 bg-white`}
      >
        <span className={`text-lg dark:text-gray-100 text-green-700`}>About</span>
        <p className={`dark:text-sky-300 text-gray-700`}>{about}</p>
      </div>
    </motion.div>
  );
};
type aboutPropType = {
  about: string;
};
export default About;
