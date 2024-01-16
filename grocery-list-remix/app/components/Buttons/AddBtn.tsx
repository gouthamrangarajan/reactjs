import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { motion } from "framer-motion";
import { useState } from "react";
import ItemAddForm from "../ItemAddForm";
import { scaleVariants } from "~/utils/animationVariants";

export default function AddBtn() {
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <>
      <motion.div
        variants={scaleVariants}
        initial="initial"
        exit="initial"
        animate="animate"
        key={2}
      >
        <button
          className="appearance-none rounded-full bg-fuchsia-600 p-1 font-semibold text-white shadow-2xl outline-none transition-all duration-300 hover:bg-opacity-80 focus:ring-1 focus:ring-fuchsia-600 focus:ring-offset-2 focus:ring-offset-fuchsia-50"
          onClick={() => setShowAddForm(true)}
        >
          <PlusIcon className="h-6 w-6"></PlusIcon>
        </button>
      </motion.div>
      {showAddForm && (
        <ItemAddForm
          closeFormAction={() => setShowAddForm(false)}
        ></ItemAddForm>
      )}
    </>
  );
}
