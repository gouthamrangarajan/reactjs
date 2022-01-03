import { createContext, Dispatch, useContext, useReducer } from "react";
import {
  GameDirectionType,
  GameProgress,
  IS_DISTINCT_POSITIONS,
  IS_VALID_POSITION,
  MAX_COLS,
  MAX_ROWS,
  SnakePositionsType,
} from "../helpers/util";
const INITIAL_GAME_CONTEXT: gameContextType = {
  snakePositions: [
    [10, 14],
    [10, 13],
    [10, 12],
    [10, 11],
    [10, 10],
  ],
  direction: "RIGHT",
  progress: "NOT_STARTED",
  result: "",
  foodPosition: null,
};
const GameContext = createContext<gameContextType>(INITIAL_GAME_CONTEXT);
const GameDispatchContext = createContext<Dispatch<string> | null>(null);
const GameProvider = ({ children }: gameProviderPropsType) => {
  const [state, dispatch] = useReducer(
    gameContextReducer,
    INITIAL_GAME_CONTEXT
  );
  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};
type gameProviderPropsType = {
  children?: React.ReactNode | React.ReactNode[];
};
export default GameProvider;

export const useGameContext = (): gameContextType => {
  return useContext(GameContext);
};
export const useGameActions = (): Dispatch<string> | null => {
  return useContext(GameDispatchContext);
};

type gameContextType = {
  snakePositions: SnakePositionsType;
  direction: GameDirectionType;
  progress: GameProgress;
  result: "WON" | "LOST" | "";
  foodPosition: [number, number] | null;
};
const gameContextReducer = (
  gameContext: gameContextType,
  action: string
): gameContextType => {
  try {
    gameContext = { ...gameContext };
    let snakePositions: SnakePositionsType = [...gameContext.snakePositions];
    let firstPosition: [number, number] = snakePositions[0];
    let nextPosition: [number, number] | null = null;
    if (snakePositions) {
      switch (action) {
        case "START": {
          gameContext.progress = "PROGRESS";
          gameContext.result = "";
          gameContext.foodPosition = spawnFood(snakePositions);
          break;
        }
        case "MOVE_RIGHT": {
          if (
            gameContext.progress == "PROGRESS" &&
            gameContext.direction != "LEFT"
          ) {
            nextPosition = [firstPosition[0], firstPosition[1] + 1];
            gameContext.direction = "RIGHT";
          }
          break;
        }
        case "MOVE_DOWN": {
          if (
            gameContext.progress == "PROGRESS" &&
            gameContext.direction != "UP"
          ) {
            nextPosition = [firstPosition[0] + 1, firstPosition[1]];
            gameContext.direction = "DOWN";
          }
          break;
        }
        case "MOVE_LEFT": {
          if (
            gameContext.progress == "PROGRESS" &&
            gameContext.direction != "RIGHT"
          ) {
            nextPosition = [firstPosition[0], firstPosition[1] - 1];
            gameContext.direction = "LEFT";
          }
          break;
        }
        case "MOVE_UP": {
          if (
            gameContext.progress == "PROGRESS" &&
            gameContext.direction != "DOWN"
          ) {
            nextPosition = [firstPosition[0] - 1, firstPosition[1]];
            gameContext.direction = "UP";
          }
          break;
        }
        default: {
          throw "INVALID ACTION";
        }
      }
    }
    if (action.startsWith("MOVE_") && nextPosition) {
      if (!IS_VALID_POSITION(nextPosition)) throw "Invalid Position";
      if (
        gameContext.foodPosition != null &&
        nextPosition[0] == gameContext.foodPosition[0] &&
        nextPosition[1] == gameContext.foodPosition[1]
      ) {
        snakePositions = [nextPosition, ...snakePositions];
        gameContext.foodPosition = spawnFood(snakePositions);
      } else
        snakePositions = [
          nextPosition,
          ...snakePositions.slice(0, snakePositions.length - 1),
        ];

      if (!IS_DISTINCT_POSITIONS(snakePositions))
        throw "Snake Positions Overlap";
    }
    return { ...gameContext, snakePositions };
  } catch (err) {
    console.log(err);
    return {
      ...gameContext,
      progress: "COMPLETED",
      result: "LOST",
    };
  }
};
const spawnFood = (snakePositions: SnakePositionsType): [number, number] => {
  let row: number = Math.floor(Math.random() * MAX_ROWS);
  let col: number = Math.floor(Math.random() * MAX_COLS);
  while (!IS_DISTINCT_POSITIONS([...snakePositions, [row, col]])) {
    row = Math.floor(Math.random() * MAX_ROWS);
    col = Math.floor(Math.random() * MAX_COLS);
  }
  return [row, col];
};
