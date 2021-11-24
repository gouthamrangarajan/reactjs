import { MutableRefObject, useCallback, useRef } from "react";

const useCallbackRef = (
  addAction: Function,
  removeAction: Function
): useCallbackRefType => {
  const el = useRef<HTMLElement>();
  const setRefEl = useCallback(
    (incomingElement: HTMLElement) => {
      if (el.current) removeAction();
      if (incomingElement) {
        el.current = incomingElement;
        addAction();
      }
    },
    [el]
  );
  return [el, setRefEl];
};
export type useCallbackRefType = [
  el: MutableRefObject<HTMLElement | undefined>,
  setRefEl: (node: HTMLElement) => void
];
export default useCallbackRef;
