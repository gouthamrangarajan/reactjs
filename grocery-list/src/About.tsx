import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  slideUpChildrenVariants,
  slideUpParentVariants,
} from "./data/animation";

export default function About() {
  return (
    <main className="grid w-full min-h-full items-center justify-center py-1 px-3">
      <motion.div
        className="flex flex-col items-start justify-center"
        initial="initial"
        animate="animate"
        variants={slideUpParentVariants}
      >
        <motion.span
          className="text-xl text-gray-700 font-semibold"
          key={1}
          variants={slideUpChildrenVariants}
        >
          Simple Grocery List
        </motion.span>
        <motion.ul
          className="list-disc mt-2 py-4 px-6"
          key={2}
          variants={slideUpParentVariants}
        >
          <motion.li key={3} variants={slideUpChildrenVariants}>
            Ability to Add/Remove item
          </motion.li>
          <motion.li key={4} variants={slideUpChildrenVariants}>
            Ability to move item from "To Buy" to "Bought Section"
          </motion.li>
          <motion.li key={5} variants={slideUpChildrenVariants}>
            Ability to clear all items
          </motion.li>
          <motion.li key={6} variants={slideUpChildrenVariants}>
            Ability to download grocery data so that it can shared across
            devices
          </motion.li>
          <motion.li key={7} variants={slideUpChildrenVariants}>
            Ability to upload grocery data
          </motion.li>
        </motion.ul>
        <motion.div key={8} variants={slideUpChildrenVariants}>
          <Link
            to="/"
            className="appearance-none outline-none mt-2 text-gray-700 text-lg hover:opacity-90 border-b-2 border-transparent focus:border-green-700 transition-colors duration-300"
          >
            Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
