import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import { slideDown, slideLeft, slideRight } from "../../utils/animation"
import Indicators from "./Indicators"
import Step1 from "./Step1"
import Step2 from "./Step2";
import Step3 from "./Step3";

function index() {
    let [currStep, setCurrStep] = useState(1);
    let [prevStep, setPrevStep] = useState(0);
    let goNext = () => {
        if (currStep < 3) {
            setPrevStep(currStep);
            setCurrStep(currStep + 1)
        }

    }
    let goPrev = () => {
        if (currStep > 1) {
            setPrevStep(currStep);
            setCurrStep(currStep - 1)
        }
    }

    return (
        <motion.div className="bg-white shadow-2xl shadow-indigo-300 py-4 px-6 pt-6 rounded-xl w-11/12
             md:w-9/12 lg:w-5/12 xl:w-4/12 flex flex-col justify-between overflow-hidden h-[24rem]"
            variants={slideDown} initial="initial" animate="animate">
            <Indicators step={currStep}></Indicators>
            <div className="mt-6">
                <AnimatePresence exitBeforeEnter>
                    {currStep == 1 && <motion.div variants={prevStep > currStep ? slideRight : slideLeft}
                        initial="initial" animate="animate" exit="exit" key={1}><Step1></Step1></motion.div>}
                    {currStep == 2 && <motion.div variants={prevStep > currStep ? slideRight : slideLeft}
                        initial="initial" animate="animate" exit="exit" key={2}><Step2></Step2></motion.div>}
                    {currStep == 3 && <motion.div variants={prevStep > currStep ? slideRight : slideLeft}
                        initial="initial" animate="animate" exit="exit" key={3}><Step3></Step3></motion.div>}
                </AnimatePresence>
            </div>
            <div className="mt-4 flex justify-between">
                <button className="appearance-none outline-none py-2 px-4 rounded hover:opacity-90 bg-black
                    text-white transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-black
                        focus:ring-offset-gray-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                    disabled={currStep == 1}
                    onClick={goPrev}>&lt; Prev</button>
                <button className="appearance-none outline-none py-2 px-4 rounded hover:opacity-90 bg-black
                    text-white transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-black
                        focus:ring-offset-gray-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                    onClick={goNext}
                    disabled={currStep == 3}>Next &gt;</button>
            </div>
        </motion.div >
    )
}

export default index