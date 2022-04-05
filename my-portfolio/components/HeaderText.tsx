import { motion } from "framer-motion";
import { NextPage } from "next";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { headerTextChild } from "../utils/animationVariants";

const HeaderText: NextPage<headerTextPropsType> = ({ classes, text }) => {
  let { color } = useContext(ThemeContext);
  return (
    <motion.div variants={headerTextChild}
      className={` bg-clip-text text-transparent bg-gradient-to-r 
        ${color == 'DARK' ? "from-sky-200 to-sky-400" : "from-sky-600 to-sky-800"}
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