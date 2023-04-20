import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { motion } from "framer-motion";
import { useFetcher } from "react-router-dom";
import { memo } from "react";
import { scaleVariants } from "../../data/animation";

const ClearAllBtn = () => {
  const fetcher = useFetcher();
  return (
    <motion.div
      variants={scaleVariants}
      initial="initial"
      exit="initial"
      animate="animate"
      key={1}
      layout="position"
      className="mb-2 lg:mb-4"
    >
      <fetcher.Form method="DELETE">
        <button
          className="appearance-none outline-none rounded-full shadow-2xl bg-red-600 text-white hover:bg-opacity-80 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-50 p-1 font-semibold"
          name="delete"
        >
          <TrashIcon className="w-6 h-6"></TrashIcon>
        </button>
      </fetcher.Form>
    </motion.div>
  );
};

export default memo(ClearAllBtn);
