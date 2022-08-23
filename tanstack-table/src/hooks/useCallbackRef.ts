import { MutableRefObject, useCallback, useRef } from "react";

function useCallbackRef(Action: () => void): useCallbackRefReturnType {
  let elRef = useRef<HTMLElement>();
  let setElRef = useCallback(
    (el: HTMLElement | undefined) => {
      elRef.current = el;
      Action();
    },
    [elRef]
  );
  return { elRef, setElRef };
}
type useCallbackRefReturnType = {
  elRef: MutableRefObject<HTMLElement | undefined>;
  setElRef: (el: HTMLElement | undefined) => void;
};
export default useCallbackRef;
