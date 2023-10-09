import { motion } from "framer-motion";
import { headerTextChild } from "../utils/animationVariants";

export default function HeaderText({
  classes = "",
  text,
}: {
  classes?: string;
  text: string;
}) {
  return (
    <motion.div
      variants={headerTextChild}
      className={` bg-gradient-to-r from-sky-200 to-sky-400 bg-clip-text text-transparent 
       ${classes}`}
      key={text}
    >
      {text}
    </motion.div>
  );
}
