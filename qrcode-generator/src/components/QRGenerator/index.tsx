import { motion } from "framer-motion";
import { LegacyRef, useRef, useState } from "react";
import { fade, staggerChild } from "../../helpers/animationVariants";
import DownloadBtn from "./DownloadBtn";
import QRCodeOutput from "./QRCodeOutput";
import SubmitBtn from "./SubmitBtn";

function Index() {
  let inpRef = useRef<HTMLInputElement>();
  let [inpVal, setInpVal] = useState("");
  let [processing, setProcessing] = useState(false);
  let [qRImgSrc, setQRImgSrc] = useState("");

  let generate = () => {
    if (inpRef.current && inpRef.current.value.trim() != "") {
      setProcessing(true);
      setInpVal(inpRef.current.value);
      setTimeout(() => {
        setProcessing(false);
      }, 1000);
    }
  };
  return (
    <motion.div
      className="shadow bg-white rounded-xl w-11/12 py-4 px-6 max-w-lg mx-auto mt-20 lg:mt-40 flex flex-col space-y-3"
      key={1}
      variants={staggerChild}
      layout
    >
      <span className="text-gray-700 text-lg">Enter the URL to get QR</span>
      <input
        type="text"
        placeholder="e.g. https://www.google.com"
        className="appearance-none outline-none py-2 px-4 rounded border border-green-600 focus:ring-1 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 transition duration-300 placeholder:text-gray-400"
        ref={inpRef as LegacyRef<HTMLInputElement>}
      />
      <SubmitBtn processing={processing} action={generate}></SubmitBtn>
      {!!inpVal && (
        <motion.div variants={fade} initial="initial" animate="animate">
          <QRCodeOutput url={inpVal} saveImgSrc={setQRImgSrc}></QRCodeOutput>
        </motion.div>
      )}
      <DownloadBtn downloadUrl={qRImgSrc}></DownloadBtn>
    </motion.div>
  );
}

export default Index;
