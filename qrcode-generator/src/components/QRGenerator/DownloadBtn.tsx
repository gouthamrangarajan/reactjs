import { motion } from "framer-motion";
import { fade } from "../../helpers/animationVariants";

function DownloadBtn({ downloadUrl }: DownloadBtnPropsType) {
  return (
    <>
      {!!downloadUrl && (
        <motion.a
          className="appearance-none outline-none transition duration-300 bg-blue-600 text-white 
      hover:opacity-90 focus:ring-1 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50 
       uppercase py-2 px-4 rounded relative disabled:cursor-not-allowed disabled:bg-blue-500 text-center"
          download="QR"
          href={downloadUrl}
          variants={fade}
          initial="initial"
          animate="animate"
        >
          Download
        </motion.a>
      )}
    </>
  );
}
type DownloadBtnPropsType = {
  downloadUrl: string;
};
export default DownloadBtn;
