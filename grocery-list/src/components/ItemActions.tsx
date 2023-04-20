import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ItemAddForm from "./ItemAddForm";
import ClearAllBtn from "./Buttons/ClearAllBtn";
import DownloadBtn from "./Buttons/DownloadBtn";
import UploadBtn from "./Buttons/UploadBtn";

export default function ItemActions() {
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <motion.div
      layout="position"
      className="fixed bottom-0 w-full left-0 flex items-end justify-around py-1 px-3 lg:py-0 lg:px-0"
    >
      <ClearAllBtn></ClearAllBtn>
      <motion.div
        className="flex pl-1 lg:pl-0 w-80 lg:w-96 justify-end gap-1 lg:gap-3 mb-2 lg:mb-4"
        key={2}
        layout="position"
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { ease: "easeInOut", duration: 0.3 },
        }}
      >
        <DownloadBtn></DownloadBtn>
        <UploadBtn></UploadBtn>
      </motion.div>
      <motion.div
        layout="position"
        className="w-80 lg:w-96 flex justify-end pr-2 lg:pr-0"
        key={3}
      >
        <AnimatePresence mode="wait">
          {showAddForm ? (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              exit={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: "spring", damping: 9, stiffness: 50 },
              }}
              key={1}
              layout="position"
              className="w-full"
            >
              <ItemAddForm
                closeFormAction={() => setShowAddForm(false)}
              ></ItemAddForm>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { type: "spring", damping: 9, stiffness: 50 },
              }}
              key={2}
              layout="position"
              className="mb-2 lg:mb-4"
            >
              <button
                className="appearance-none outline-none rounded-full shadow-2xl bg-fuchsia-600 text-white hover:bg-opacity-80 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-fuchsia-600 focus:ring-offset-fuchsia-50 p-1 font-semibold"
                onClick={() => setShowAddForm(true)}
              >
                <PlusIcon className="w-8 h-8"></PlusIcon>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
