import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { useFetcher } from "@remix-run/react";
import { motion } from "framer-motion";
import { scaleVariants } from "~/utils/animationVariants";

export default function ClearAllBtn() {
  const fetcher = useFetcher();
  return (
    <motion.div
      variants={scaleVariants}
      initial="initial"
      exit="initial"
      animate="animate"
      key={1}
    >
      <fetcher.Form method="DELETE">
        <button
          className="appearance-none rounded-full bg-red-600 p-1 font-semibold text-white shadow-2xl outline-none transition-all duration-300 hover:bg-opacity-80 focus:ring-1 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
          name="delete"
        >
          <TrashIcon className="h-6 w-6"></TrashIcon>
        </button>
      </fetcher.Form>
    </motion.div>
  );
}
