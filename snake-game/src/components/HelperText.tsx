import { useGameContext } from "./GameProvider";

const HelperText = () => {
  const gameContext = useGameContext();

  return (
    <div className="mt-1 text-sm text-blue-600 font-semibold h-2">
      {gameContext.progress == "NOT_STARTED" && (
        <span>Please press any arrow key to start the game</span>
      )}
    </div>
  );
};

export default HelperText;
