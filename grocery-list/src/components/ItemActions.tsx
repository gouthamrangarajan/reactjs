import { motion } from "framer-motion";
import ClearAllBtn from "./Buttons/ClearAllBtn";
import DownloadBtn from "./Buttons/DownloadBtn";
import UploadBtn from "./Buttons/UploadBtn";
import AddBtn from "./Buttons/AddBtn";

export default function ItemActions() {
  return (
    <motion.div
      layout="position"
      className="fixed bottom-2 left-0 flex w-full items-center justify-between px-3 py-1 lg:bottom-4"
    >
      <ClearAllBtn></ClearAllBtn>
      <div className="flex flex-1 items-center justify-center gap-1 lg:gap-3">
        <DownloadBtn></DownloadBtn>
        <UploadBtn></UploadBtn>
      </div>
      <AddBtn></AddBtn>
    </motion.div>
  );
}
