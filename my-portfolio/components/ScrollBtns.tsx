import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";

const ScrollBtns: NextPage<scrollRowBtnsPropsType> = ({
  showLeftScroll,
  scrollLeft,
  showRightScroll,
  scrollRight,
}) => {
  return (
    <>
      <AnimatePresence>
        {showLeftScroll && (
          <motion.button
            initial={{ transform: "translateX(-4rem)" }}
            animate={{ transform: "translateX(0)" }}
            exit={{ transform: "translateX(-4rem)" }}
            transition={{ duration: 0.3 }}
            className="appearance-none outline-none absolute top-0 left-0 rounded-full mt-56
       ml-1 transition duration-300 bg-pink-600 shadow-2xl opacity-50 hover:opacity-100 p-1 cursor-pointer
      ring-2 ring-pink-600 focus:ring-offset-2 focus:ring-offset-pink-100 ease-in-out"
            onClick={() => scrollLeft()}
          >
            <ChevronLeftIcon className="w-8 h-8 text-white"></ChevronLeftIcon>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showRightScroll && (
          <motion.button
            initial={{ transform: "translateX(4rem)" }}
            animate={{ transform: "translateX(0)" }}
            exit={{ transform: "translateX(4rem)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="appearance-none outline-none absolute top-0 right-0 rounded-full mt-56
         mr-3 transition duration-300 bg-pink-600 shadow-2xl opacity-50 hover:opacity-100 p-1 cursor-pointer
        ring-2 ring-pink-600 focus:ring-offset-2 focus:ring-offset-pink-100 ease-in-out"
            onClick={() => scrollRight()}
          >
            <ChevronRightIcon className="w-8 h-8 text-white"></ChevronRightIcon>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
type scrollRowBtnsPropsType = {
  showLeftScroll: boolean;
  scrollLeft: Function;
  showRightScroll: boolean;
  scrollRight: Function;
};
export default ScrollBtns;
