import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import {
  slideUpChildrenVariants,
  slideUpParentVariants,
} from "~/utils/animationVariants";

export default function About() {
  return (
    <main className="grid h-full w-full items-center justify-center px-3 py-1">
      <motion.div
        className="flex flex-col items-start justify-center"
        initial="initial"
        animate="animate"
        variants={slideUpParentVariants}
      >
        <motion.span
          className="text-xl font-semibold text-gray-700"
          key={1}
          variants={slideUpChildrenVariants}
        >
          Simple Grocery List
        </motion.span>
        <motion.ul
          className="mt-2 list-disc px-6 py-4"
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
          <motion.li key={8} variants={slideUpChildrenVariants}>
            Ability to maintain state real time using Partykit.io
          </motion.li>
        </motion.ul>
        <motion.div key={9} variants={slideUpChildrenVariants}>
          <Link
            to="/"
            className="mt-2 appearance-none border-b-2 border-transparent text-lg text-gray-700 outline-none transition-colors duration-300 hover:opacity-90 focus:border-green-700"
          >
            Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
