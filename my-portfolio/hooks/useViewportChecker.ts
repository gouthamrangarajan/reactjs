import { useEffect } from "react";
import useCallbackRef, { useCallbackRefType } from "./useCallbackRef";

const useViewportChecker = (
  inViewportAction: Function,
  outViewportAction: Function
): useCallbackRefType => {
  let observerToDisconnect: IntersectionObserver;
  useEffect(() => {
    return () => {
      if (observerToDisconnect) observerToDisconnect.disconnect();
    };
  }, []);
  const [el, setRefEl] = useCallbackRef(
    () => {
      const io = new IntersectionObserver((entries, observer) => {
        observerToDisconnect = observer;
        entries.forEach((entry) => {
          if (entry.isIntersecting) inViewportAction();
          else outViewportAction();
        });
      });
      io.observe(el.current as Element);
    },
    () => {
      if (observerToDisconnect) observerToDisconnect.disconnect();
    }
  );
  return [el, setRefEl];
};

export default useViewportChecker;
