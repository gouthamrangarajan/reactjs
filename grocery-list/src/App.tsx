import { Link } from "react-router-dom";
import ItemActions from "./components/ItemActions";
import ItemCardsContainerGrid from "./components/ItemCardsContainerGrid";
import ItemsOrderChange from "./components/ItemsOrderChange";

function App() {
  return (
    <main className="flex flex-col w-full min-h-full lg:h-full py-1 px-3 gap-3 items-center justify-center pb-12 lg:pb-0">
      <ItemCardsContainerGrid></ItemCardsContainerGrid>
      <div className="w-full max-w-xl mx-auto flex justify-center lg:justify-end ">
        <ItemsOrderChange></ItemsOrderChange>
      </div>
      <div className="w-full flex justify-center lg:mt-24">
        <Link
          to="/about"
          className="appearance-none outline-none mr-14 text-gray-700 text-lg hover:opacity-90 border-b-2 border-transparent focus:border-green-700 transition-all duration-300"
        >
          About
        </Link>
      </div>
      <ItemActions></ItemActions>
    </main>
  );
}

export default App;
