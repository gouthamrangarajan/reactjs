import { Link, useRevalidator } from "react-router-dom";
import ItemActions from "./components/ItemActions";
import ItemCardsContainerGrid from "./components/ItemCardsContainerGrid";
import ItemsOrderChange from "./components/ItemsOrderChange";
import { receiveMessage, removeReceiveMessage } from "./hooks/usePartyKit";
import localforage from "localforage";
import { useEffect } from "react";

function App() {
  let revalidator = useRevalidator();
  useEffect(() => {
    let callback = async (message: MessageEvent<any>) => {
      let data = message.data;
      try {
        let parsedData = JSON.parse(data);
        if (typeof parsedData.items.length != "undefined") {
          await localforage.setItem("grocery", parsedData.items);
          revalidator.revalidate();
        }
      } catch (err) {
        console.log(err);
      }
    };
    receiveMessage(callback);
    return () => {
      removeReceiveMessage(callback);
    };
  }, []);

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
