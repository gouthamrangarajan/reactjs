import { motion } from "framer-motion";
import type { NextPage } from "next";
import { staggerChild } from "../utils/animationVariants";

const SecondRowLayout: NextPage<layoutType> = ({ children, keyVal }) => {
  return (
    <motion.div
      className="flex w-full items-center justify-center mt-6 flex-shrink-0"
      variants={staggerChild}
      key={keyVal}
    >
      <div
        className="flex flex-col space-y-1 lg:space-y-0 lg:flex-row lg:space-x-4 lg:items-center 
         w-11/12 lg:w-10/12 xl:w-8/12"
      >
        {children}
      </div>
    </motion.div>
  );
};
type layoutType = {
  children: React.ReactNode[] | React.ReactNode | undefined;
  keyVal: number | string;
};
export default SecondRowLayout;
