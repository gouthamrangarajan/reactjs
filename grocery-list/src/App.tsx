import { Link } from "react-router-dom";
import ItemActions from "./components/ItemActions";
import ItemCardsContainerGrid from "./components/ItemCardsContainerGrid";
import ItemsOrderChange from "./components/ItemsOrderChange";

function App() {
  return (
    <main className="flex min-h-full w-screen flex-col items-center justify-center gap-3 overflow-x-hidden px-3 py-1 pb-12 lg:h-full lg:pb-0">
      <ItemCardsContainerGrid></ItemCardsContainerGrid>
      <div className="mx-auto flex w-full max-w-xl justify-center lg:justify-end ">
        <ItemsOrderChange></ItemsOrderChange>
      </div>
      <div className="flex w-full justify-center lg:mt-24">
        <Link
          to="/about"
          className="mr-14 appearance-none border-b-2 border-transparent text-lg text-gray-700 outline-none transition-all duration-300 hover:opacity-90 focus:border-green-700"
        >
          About
        </Link>
      </div>
      <ItemActions></ItemActions>
    </main>
  );
}

export default App;
