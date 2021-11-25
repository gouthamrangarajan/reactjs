import { useEffect, useState } from "react";
import useWindowEvent from "./useWindowEvent";

const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState(991);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  useWindowEvent("resize", () => setWindowWidth(window.innerWidth));
  return windowWidth;
};

export default useWindowWidth;
