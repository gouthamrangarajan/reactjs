//custom hook for debounce event used in seach text box

import { useEffect } from "react";
const useDebouncedAction = (action, delay = 200) => {
  let timeout = null;
  useEffect(() => {
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);
  const debouncedAction = (args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      action(args);
    }, delay);
  };
  return debouncedAction;
};
export default useDebouncedAction;
