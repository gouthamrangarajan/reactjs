import { motion } from "framer-motion";

function Indicators({ step }: IndicatorsPropsType) {
    return (
        <div className="w-full flex items-center justify-center space-x-2 lg:space-x-3">
            {[1, 2, 3].map(el => (
                <div className="flex flex-col w-1/3 justify-center items-center space-y-1 " key={el}>
                    <div className="h-2 w-full bg-gray-300 rounded-full relative">
                        {step == el && <motion.div className="h-full w-full bg-purple-600 rounded-full absolute top-0 left-0"
                            layoutId="indicator" key={el}>
                        </motion.div>
                        }
                    </div>
                    {el == 1 &&
                        <span className={`${step == el ? "font-semibold" : ""} w-full truncate transition duration-300
                            bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text
                            italic text-sm`}>Personal Information</span>}
                    {el == 2 &&
                        <span className={`${step == el ? "font-semibold" : ""} w-full truncate transition duration-300
                            bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text 
                            italic text-sm`}>Email &amp; Password</span>}
                    {el == 3 &&
                        <span className={`${step == el ? "font-semibold" : ""} w-full truncate transition duration-300 
                            bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text 
                            italic text-sm`}>Mobile &amp; OTP</span>}
                </div>
            ))}
        </div>
    )
}
type IndicatorsPropsType = {
    step: number;
}
export default Indicators