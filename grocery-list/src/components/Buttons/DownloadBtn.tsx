import { memo, useEffect, useRef } from "react";
import ArrowDownTrayIcon from "@heroicons/react/24/solid/ArrowDownTrayIcon";
import { useLoaderData } from "react-router-dom";
import { type Grocery_Item } from "../../data/models/grocery";
import { motion } from "framer-motion";
import { scaleVariants } from "../../data/animation";

const DownloadBtn = () => {
  const groceryItems = useLoaderData() as Array<Grocery_Item>;
  const groceryItemsString = JSON.stringify(groceryItems);
  const blob = new Blob([groceryItemsString], { type: "text/plain" });
  const aEl = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (aEl.current) aEl.current.href = URL.createObjectURL(blob);
  }, [groceryItems]);
  return (
    <>
      <motion.div
        variants={scaleVariants}
        initial="initial"
        exit="initial"
        animate="animate"
        key={"download_button"}
      >
        <button
          className="appearance-none rounded-full bg-purple-600 p-1 font-semibold text-white shadow-2xl outline-none transition-all duration-300 hover:bg-opacity-80 focus:ring-1 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-purple-50"
          onClick={() => {
            if (aEl.current) aEl.current.click();
          }}
        >
          <ArrowDownTrayIcon className="h-6 w-6"></ArrowDownTrayIcon>
        </button>
      </motion.div>
      {groceryItems.length > 0 && (
        <a
          ref={aEl}
          style={{ display: "none" }}
          target="_blank"
          download="download.txt"
        ></a>
      )}
    </>
  );
};

export default memo(DownloadBtn);
