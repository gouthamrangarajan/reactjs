import { NextComponentType, NextPageContext } from "next";
import { LegacyRef, useEffect, useRef, useState } from "react";
import useViewportChecker from "../hooks/useViewportChecker";
import useWindowWidth from "../hooks/useWindowWidth";
import ScrollBtns from "./ScrollBtns";

const ScrollRowLayout: NextComponentType<
  NextPageContext,
  {},
  scrollRowLayoutPropsType
> = ({ title, subtitle, children, centered }) => {
  const scrollEl = useRef<HTMLDivElement>();
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const windowWidth = useWindowWidth();

  const [_, setLastEl] = useViewportChecker(
    () => setShowRightScroll(false),
    () => setShowRightScroll(true)
  );

  const scrollRight = () => {
    if (scrollEl.current) {
      scrollEl.current.scrollTo({
        behavior: "smooth",
        left: scrollEl.current.scrollLeft + 1000,
      });
      setShowLeftScroll(true);
    }
  };
  const scrollLeft = () => {
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
  return (
    <div className="flex flex-col mt-6 w-full flex-shrink-0 relative">
      <span className="text-xl text-pink-600 font-semibold w-full text-center">
        {title}
      </span>
      <span className="text-gray-600 font-semibold w-full text-center">
        {subtitle}
      </span>
      <div
        className={`flex -space-x-40 md:-space-x-64 p-1 overflow-x-auto lg:overflow-x-hidden w-full
                    scrollbar-none
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
