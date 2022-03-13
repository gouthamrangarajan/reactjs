import { motion } from "framer-motion";
import { NextPage } from "next";
import { LegacyRef, useContext, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import useViewportChecker from "../hooks/useViewportChecker";
import useWindowWidth from "../hooks/useWindowWidth";
import { staggerChild } from "../utils/animationVariants";
import ScrollBtns from "./ScrollBtns";

const ScrollRowLayout: NextPage<scrollRowLayoutPropsType> = ({
  title,
  subtitle,
  children,
  centered,
}) => {
  let scrollEl = useRef<HTMLDivElement>();
  let [showLeftScroll, setShowLeftScroll] = useState(false);
  let [showRightScroll, setShowRightScroll] = useState(true);
  let windowWidth = useWindowWidth();

  let [_, setLastEl] = useViewportChecker(
    () => setShowRightScroll(false),
    () => setShowRightScroll(true)
  );

  let scrollRight = () => {
    if (scrollEl.current) {
      scrollEl.current.scrollTo({
        behavior: "smooth",
        left: scrollEl.current.scrollLeft + 1000,
      });
      setShowLeftScroll(true);
    }
  };
  let scrollLeft = () => {
    if (scrollEl.current) {
      let left = scrollEl.current.scrollLeft - 1000;
      if (left < 0) left = 0;

      scrollEl.current.scrollTo({
        behavior: "smooth",
        left,
      });
      if (left == 0) setShowLeftScroll(false);
    }
  };
  let {color}=useContext(ThemeContext);
  return (
    <motion.div
      className="flex flex-col mt-6 w-full flex-shrink-0 relative"
      variants={staggerChild}
      key={title}
    >
      <span className={`text-xl font-semibold w-full text-center text-pink-600 dark:text-sky-400 }`}>
        {title}
      </span>
      <span className={`font-semibold w-full text-center ${color=="DARK"?"text-sky-300":"text-gray-600"}`}>
        {subtitle}
      </span>
      <div
        className={`flex -space-x-40 md:-space-x-64 p-1 overflow-x-auto lg:overflow-x-hidden w-full scrollbar-none
                    ${
                      centered && windowWidth > 1023 ? "justify-center" : ""
                    }  `}
        ref={scrollEl as LegacyRef<HTMLDivElement>}
      >
        {children}
        <span className="w-0" ref={setLastEl}></span>
      </div>
      {!centered && windowWidth > 1023 && (
        <ScrollBtns
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
          showLeftScroll={showLeftScroll}
          showRightScroll={showRightScroll}
        ></ScrollBtns>
      )}
    </motion.div>
  );
};
type scrollRowLayoutPropsType = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode | React.ReactNode[] | undefined;
  centered?: boolean | undefined;
};
export default ScrollRowLayout;
