import { memo, useEffect, useRef } from "react";
import ArrowDownTrayIcon from "@heroicons/react/24/solid/ArrowDownTrayIcon";
import { useLoaderData } from "react-router-dom";
import { type Grocery_Item } from "../../data/models/grocery";
import { motion } from "framer-motion";

const DownloadBtn = () => {
  const groceryItems = useLoaderData() as Array<Grocery_Item>;
  const groceryItemsString = JSON.stringify(groceryItems);
  const blob = new Blob([groceryItemsString], { type: "application/json" });
  const aEl = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (aEl.current) aEl.current.href = URL.createObjectURL(blob);
  }, [groceryItems]);
  return (
    <>
      <motion.button
        layout="position"
        key={"download_button"}
        className="appearance-none outline-none rounded-full shadow-2xl bg-purple-600 text-white hover:bg-opacity-80 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-purple-600 focus:ring-offset-purple-50 p-1 font-semibold"
        onClick={() => {
          if (aEl.current) aEl.current.click();
        }}
      >
        <ArrowDownTrayIcon className="w-7 h-7"></ArrowDownTrayIcon>
      </motion.button>
      {groceryItems.length > 0 && (
        <a
          ref={aEl}
          style={{ display: "none" }}
          target="_blank"
          download="download.json"
        ></a>
      )}
    </>
  );
};

export default memo(DownloadBtn);
