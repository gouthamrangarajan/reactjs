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
      case "ArrowUp":
      case "w":
      case "W": {
        setKeyboardEventQueue([...keyboardEventQueue, "UP"]);
        break;
      }
      case "ArrowDown":
      case "s":
      case "S": {
        setKeyboardEventQueue([...keyboardEventQueue, "DOWN"]);
        break;
      }
      case "ArrowLeft":
      case "a":
      case "A": {
        setKeyboardEventQueue([...keyboardEventQueue, "LEFT"]);
        break;
      }
      case "ArrowRight":
      case "D":
      case "d": {
        setKeyboardEventQueue([...keyboardEventQueue, "RIGHT"]);
        break;
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", arrowHandler);
    return () => window.removeEventListener("keydown", arrowHandler);
  }, []);
  useEffect(() => {
    let timeout: number;
    if (keyboardEventQueue.length == 1)
      shiftAndCallHandle(keyboardEventQueue, handler);
    else
      timeout = setTimeout(() => {
        shiftAndCallHandle(keyboardEventQueue, handler);
      }, 100);

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
