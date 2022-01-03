import { MAX_COLS, MAX_ROWS, SnakePositionsType } from "../helpers/util";
import { useGameContext } from "./GameProvider";

const BoxBorder = () => {
  const gameContext = useGameContext();
  return (
    <>
      {Array.from({ length: MAX_ROWS }, (_, i) => i).map((el, outInd) => (
        <div className="flex" key={`el_${el}`}>
          {Array.from({ length: MAX_COLS }, (_, i) => i).map((inEl, inInd) => (
            <div
              className={`border-r border-b border-gray-300  h-[10px] w-[10px]
                        ${
                          checkSnakePosition(
                            [outInd, inInd],
                            gameContext.snakePositions
                          ) ||
                          checkFoodPosition(
                            [outInd, inInd],
                            gameContext.foodPosition
                          )
                            ? "bg-gray-700"
                            : "bg-white"
                        }`}
              key={`inEl_${inEl}`}
            ></div>
          ))}
        </div>
      ))}
    </>
  );
};

export default BoxBorder;

const checkSnakePosition = (
  tup: [number, number],
  snakePositions: SnakePositionsType
): boolean => {
  return (
    snakePositions.filter((el) => el[0] == tup[0] && el[1] == tup[1]).length > 0
  );
};
const checkFoodPosition = (
  tup: [number, number],
  foodPosition: [number, number] | null
): boolean => {
  return (
    foodPosition != null &&
    foodPosition[0] == tup[0] &&
    foodPosition[1] == tup[1]
  );
};
