import { motion } from "framer-motion";
import { staggerChild } from "../helpers/animationVariants";

function Footer() {
  return (
    <motion.footer
      className="w-full mt-20"
      key={2}
      variants={staggerChild}
      layout="position"
    >
      <p className="text-center text-sm text-gray-100 italic w-full flex space-x-1 items-center justify-center">
        <span>Inspiration :</span>
        <a
          href="https://www.youtube.com/watch?v=qNiUlml9MDk&t=1660s&ab_channel=TraversyMedia"
          className="text-red-200 hover:opacity-90 underline font-semibold transition duration-300"
          target="_blank"
        >
          Traversy Media
        </a>
      </p>
    </motion.footer>
  );
}

export default Footer;
