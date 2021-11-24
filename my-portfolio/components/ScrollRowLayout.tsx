import { NextComponentType, NextPageContext } from "next";
import { LegacyRef, useRef, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import useViewportChecker from "../hooks/useViewportChecker";
import { AnimatePresence, motion } from "framer-motion";

const ScrollRowLayout: NextComponentType<
  NextPageContext,
  {},
  scrollRowLayoutPropsType
> = ({ title, subtitle, children, centered }) => {
  const scrollEl = useRef<HTMLDivElement>();
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [_, setLastEl] = useViewportChecker(
    () => setShowRightScroll(false),
    () => setShowRightScroll(true)
  );

  const scrollRight = () => {
    if (scrollEl.current) {
      scrollEl.current.scrollTo({
        behavior: "smooth",
        left:
          scrollEl.current.scrollLeft + (window.innerWidth > 991 ? 1000 : 500),
      });
      setShowLeftScroll(true);
    }
  };
  const scrollLeft = () => {
    if (scrollEl.current) {
      let left =
        scrollEl.current.scrollLeft - (window.innerWidth > 991 ? 1000 : 500);
      if (left < 0) left = 0;

      scrollEl.current.scrollTo({
        behavior: "smooth",
        left,
      });
      if (left == 0) setShowLeftScroll(false);
    }
  };
  return (
    <div className="flex flex-col mt-6 w-full flex-shrink-0 relative">
      <span className="text-xl text-pink-600 font-semibold w-full text-center">
        {title}
      </span>
      <span className="text-gray-600 font-semibold w-full text-center">
        {subtitle}
      </span>
      <div
        className={`flex -space-x-40 md:-space-x-64 p-1 overflow-x-hidden w-full
                     ${centered ? "justify-center" : ""}  `}
        ref={scrollEl as LegacyRef<HTMLDivElement>}
      >
        {children}
        <span className="w-0" ref={setLastEl}></span>
      </div>
      <AnimatePresence>
        {!centered && showLeftScroll && (
          <motion.button
            initial={{ transform: "translateX(-4rem)" }}
            animate={{ transform: "translateX(0)" }}
            exit={{ transform: "translateX(-4rem)" }}
            transition={{ duration: 0.3 }}
            className="appearance-none outline-none absolute top-0 left-0 rounded-full mt-[15%] ml-1
        transition duration-300 bg-pink-600 shadow-2xl opacity-50 hover:opacity-100 p-1 cursor-pointer
        ring-2 ring-pink-600 focus:ring-offset-2 focus:ring-offset-pink-100 ease-in-out"
            onClick={scrollLeft}
          >
            <ChevronLeftIcon className="w-8 h-8 text-white"></ChevronLeftIcon>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!centered && showRightScroll && (
          <motion.button
            initial={{ transform: "translateX(4rem)" }}
            animate={{ transform: "translateX(0)" }}
            exit={{ transform: "translateX(4rem)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="appearance-none outline-none absolute top-0 right-0 rounded-full mt-[15%] mr-3
        transition duration-300 bg-pink-600 shadow-2xl opacity-50 hover:opacity-100 p-1 cursor-pointer
        ring-2 ring-pink-600 focus:ring-offset-2 focus:ring-offset-pink-100 ease-in-out"
            onClick={scrollRight}
          >
            <ChevronRightIcon className="w-8 h-8 text-white"></ChevronRightIcon>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
type scrollRowLayoutPropsType = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode | React.ReactNode[] | undefined;
  centered?: boolean | undefined;
};
export default ScrollRowLayout;
