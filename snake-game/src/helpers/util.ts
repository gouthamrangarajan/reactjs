export const MAX_ROWS = 35;
export const MAX_COLS = 35;
export type SnakePositionsType = Array<[number, number]>;
export type GameDirectionType = "RIGHT" | "LEFT" | "UP" | "DOWN";
export type GameDirectionInpFunctionType = (
  direction: GameDirectionType
) => void;
export type GameProgress = "PROGRESS" | "COMPLETED" | "NOT_STARTED";
export const IS_VALID_POSITION = (tup: [number, number]): boolean => {
  return tup[0] >= 0 && tup[0] < MAX_ROWS && tup[1] >= 0 && tup[1] < MAX_COLS;
};
export const IS_DISTINCT_POSITIONS = (
  snakePositions: SnakePositionsType
): boolean => {
  return (
    new Set(snakePositions.map((el) => `${el[0]}_${el[1]}`)).size ==
    snakePositions.length
  );
};
