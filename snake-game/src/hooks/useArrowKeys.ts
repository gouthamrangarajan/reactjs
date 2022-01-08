import { useEffect, useState } from "react";
import {
  GameDirectionInpFunctionType,
  GameDirectionType,
} from "../helpers/util";

export const useArrowKeys = (handler: GameDirectionInpFunctionType) => {
  const [keyboardEventQueue, setKeyboardEventQueue] = useState<
    Array<GameDirectionType>
  >([]);
  const arrowHandler = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case "ArrowUp": {
        setKeyboardEventQueue([...keyboardEventQueue, "UP"]);
        break;
      }
      case "ArrowDown": {
        setKeyboardEventQueue([...keyboardEventQueue, "DOWN"]);
        break;
      }
      case "ArrowLeft": {
        setKeyboardEventQueue([...keyboardEventQueue, "LEFT"]);
        break;
      }
      case "ArrowRight": {
        setKeyboardEventQueue([...keyboardEventQueue, "RIGHT"]);
        break;
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keyup", arrowHandler);
    return () => window.removeEventListener("keyup", arrowHandler);
  }, []);
  useEffect(() => {
    let timeout: number;
    if (keyboardEventQueue.length == 1)
      shiftAndCallHandle(keyboardEventQueue, handler);
    else
      timeout = setTimeout(() => {
        shiftAndCallHandle(keyboardEventQueue, handler);
      }, 50);

    return () => clearTimeout(timeout);
  }, [keyboardEventQueue]);
};
const shiftAndCallHandle = (
  keyboardEventQueue: Array<GameDirectionType>,
  handler: GameDirectionInpFunctionType
) => {
  let arrow = keyboardEventQueue.shift();
  if (arrow) handler(arrow);
};
