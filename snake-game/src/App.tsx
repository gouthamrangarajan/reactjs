import BoxBorder from "./components/BoxBorder";
import GameBox from "./components/GameBox";
import GameProvider from "./components/GameProvider";
import HelperText from "./components/HelperText";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <GameProvider>
        <GameBox>
          <BoxBorder></BoxBorder>
        </GameBox>
        <HelperText></HelperText>
      </GameProvider>
    </div>
  );
}

export default App;
