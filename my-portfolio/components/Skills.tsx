import { motion } from "framer-motion";
import { NextPage } from "next";
import { skillType } from "../models/dataType";
import { staggerChild, staggerParent } from "../utils/animationVariants";

const Skills: NextPage<skillsPropType> = ({ data }) => {
    return (
        <div className="w-full">
            <div className="w-full flex flex-col flex-shrink-0">
                <span className="text-3xl text-sky-700 font-semibold italic w-full text-center tracking-widest">Skills</span>
                <motion.div className="flex space-x-4 max-w-6xl flex-wrap mx-auto items-center justify-center py-4 px-6 flex-shrink-0"
                    variants={staggerParent} initial="hidden" animate="show">
                    {data.map(el => (<motion.div className={`p-1 rounded-xl 
                                                ${["NextJs", "Azure Functions"].includes(el.name) ? "pt-8 h-32 w-32" : "h-24 w-24"}`}
                        key={el.name} variants={staggerChild}>
                        <img src={el.imgSrc} key={el.name} alt={el.name} className="object-contain rounded-xl cursor-pointer"
                            title={el.name}></img>
                    </motion.div>))
                    }
                    <motion.span className="font-semibold p-2 rounded-lg bg-sky-600 text-white" variants={staggerChild} key="more">
                        AND MANY MORE...
                    </motion.span>
                </motion.div>
            </div>
        </div>
    )
}
type skillsPropType = {
    data: skillType[];
}
export default Skills