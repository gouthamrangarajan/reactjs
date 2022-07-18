import { motion } from "framer-motion";
import { moveNext, movePrev } from "../../animation";
import useCalendar from "../../hooks/useCalendar";
import { TIME_ARRAY } from "../../model";
import Block from "./Block";

function Index() {
    let { currDayOfTheMonth, prevDayOftheMonth, currMonthIndex, prevMonthIndex } = useCalendar();

    return (
        <>
            {TIME_ARRAY.map((el, ind) => (
                <motion.div className="flex w-full items-start" key={`${currDayOfTheMonth}_${el}`}
                    variants={prevDayOftheMonth < currDayOfTheMonth || prevMonthIndex < currMonthIndex ? moveNext : movePrev}
                    initial="initial" animate="animate">
                    <span className="text-gray-600 text-xs px-3 -mt-2 w-16 select-none">{el}</span>
                    <Block time={el} index={ind}></Block>
                </motion.div>
            ))}
        </>
    )
}

export default Index