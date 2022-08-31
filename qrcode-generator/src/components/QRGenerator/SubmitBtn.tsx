import { motion } from "framer-motion";
import { fade } from "../../helpers/animationVariants";

function SubmitBtn({ action, processing }: SubmitBtnPropsType) {
  return (
    <button
      className="appearance-none outline-none transition duration-300 bg-green-600 text-white
          hover:opacity-90 focus:ring-1 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50  
          uppercase py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-green-500 flex items-center justify-center space-x-3"
      onClick={action}
      disabled={processing}
    >
      <div className="relative">
        {processing && (
          <motion.svg
            className="animate-spin w-6 h-6 text-white absolute -top-3 right-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            variants={fade}
            initial="initial"
            animate="animate"
          >
            <circle
              className="opacity-50"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </motion.svg>
        )}
      </div>
      <span>Submit</span>
    </button>
  );
}
type SubmitBtnPropsType = {
  action: () => void;
  processing: boolean;
};
export default SubmitBtn;
