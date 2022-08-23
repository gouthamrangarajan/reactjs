import { motion } from "framer-motion";
import { slideDownAnimationVariant } from "../util/helper";

function Nav() {
  return (
    <motion.nav
      className="w-full sticky top-0 bg-white border-b border-gray-300 py-2 px-4"
      variants={slideDownAnimationVariant}
      initial="initial"
      animate="animate"
      exit="initial"
    >
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <span className="text-xl font-semibold text-blue-600">React</span>
        <span className="text-lg text-green-600 font-semibold">
          Tanstack Table
        </span>
      </div>
    </motion.nav>
  );
}

export default Nav;
