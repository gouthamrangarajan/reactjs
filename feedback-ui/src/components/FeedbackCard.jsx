import { motion } from "framer-motion";

const FeedbackCard = ({ item }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="card relative py-1 px-3 pl-7 lg:py-2 lg:px-4 lg:pl-7 xl:py-4 xl:px-6 xl:pl-9"
      layout
    >
      <textarea
        className="appearance-none outline-none resize-none text-gray-700 w-full flex-1 overflow-y-auto scrollbar-thin
        scrollbar-track-purple-50 scrollbar-thumb-purple-300 scrollbar-thumb-rounded-md cursor-pointer"
        value={item.feedback}
        readOnly
      ></textarea>
      <span
        className={`absolute top-0 left-0 rounded-full lg:text-lg bg-pink-300 text-black py-1 -mt-3 -ml-3 z-10
                  ${item.rating < 10 ? " px-3" : " px-2"}
                `}
      >
        {item.rating}
      </span>
    </motion.div>
  );
};
export default FeedbackCard;
