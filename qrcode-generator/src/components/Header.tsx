import { motion } from "framer-motion";
import { slideDown } from "../helpers/animationVariants";

function Header() {
  return (
    <motion.header
      className="w-full text-center"
      variants={slideDown}
      initial="initial"
      animate="animate"
    >
      <span className="text-slate-100 text-xl font-semibold">
        QR Code Generator
      </span>
    </motion.header>
  );
}

export default Header;
