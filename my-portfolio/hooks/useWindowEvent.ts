import { useEffect } from "react";

const useWindowEvent = (event: string, action: Function): void => {
  const ev = action as EventListener;
  useEffect(() => {
    window.addEventListener(event, ev);
    return () => window.removeEventListener(event, ev);
  }, []);
};

export default useWindowEvent;
