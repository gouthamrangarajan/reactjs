import { motion } from "framer-motion";
import { NextPage } from "next";
import { headerTextChild } from "../utils/animationVariants";

const HeaderText: NextPage<headerTextPropsType> = ({ classes, text }) => {
  return (
    <motion.div variants={headerTextChild}
      className={` bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-sky-400 
       ${classes}`} key={text}>
      {text}
    </motion.div>
  )
}
type headerTextPropsType = {
  classes?: string | undefined;
  text: string;
}
export default HeaderText