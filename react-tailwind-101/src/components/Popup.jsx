import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { modalVariants } from "../utils/animationVariants";

const Popup = ({ show, children, title, close, size }) => {
  const [showModalItems, setShowModalItems] = useState(false);
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShowModalItems(true);
      }, 300);
    }
  }, [show]);
  const closeModal = () => {
    setShowModalItems(false);
    setTimeout(() => {
      close();
    }, 300);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="min-h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-50 z-10 flex justify-center items-center"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          key={1}
        >
          <AnimatePresence>
            {showModalItems && (
              <motion.div
                className={`bg-white rounded py-1 lg:py-2 px-3 lg:px-4 w-11/12 ${
                  size == "small" ? "lg:w-4/12" : "lg:w-6/12"
                }`}
                onClick={(ev) => ev.stopPropagation()}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                variants={modalVariants}
                key={2}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-green-700">
                    {title}
                  </span>
                  <button
                    className="appearance-none outline-none p-1 bg-gray-100 hover:bg-gray-200
                   rounded-full text-red-600  transition-all duration-300 ease-in
                    cursor-pointer focus:ring focus:ring-gray-300"
                    onClick={closeModal}
                  >
                    <FaTimes
                      className="
                  w-4 h-4"
                    ></FaTimes>
                  </button>
                </div>
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
