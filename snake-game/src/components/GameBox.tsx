import React, { useEffect } from "react";
import { GameDirectionType } from "../helpers/util";
import { useArrowKeys } from "../hooks/useArrowKeys";
import { useGameContext, useGameActions } from "./GameProvider";

const GameBox = ({ children }: gameBoxPropsType) => {
  const dispatch = useGameActions();
  const gameContext = useGameContext();
  useArrowKeys((direction: GameDirectionType) => {
    if (dispatch) {
      if (gameContext.progress == "NOT_STARTED") dispatch("START");
      dispatch(`MOVE_${direction.toString()}`);
    }
  });
  useEffect(() => {
    let timeout: number;
    if (gameContext.progress == "PROGRESS" && dispatch) {
      timeout = setTimeout(() => {
        dispatch(`MOVE_${gameContext.direction.toString()}`);
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [dispatch, gameContext]);
  return (
    <div
      className={`border-2  w-[354px] h-[353px] rounded shadow-md ${
        gameContext.result != "LOST" ? "border-blue-600" : "border-red-600"
      }`}
    >
      {children}
    </div>
  );
};
type gameBoxPropsType = {
  children?: React.ReactNode | React.ReactNode[];
};
export default GameBox;
