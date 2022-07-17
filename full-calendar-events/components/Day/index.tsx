import { motion } from "framer-motion";
import { moveNext, movePrev } from "../../animation";
import useCalendar from "../../hooks/useCalendar";
import { TIME_ARRAY } from "../../model";

function Index() {

    let { currDayOfTheMonth, prevDayOftheMonth, currMonthIndex, prevMonthIndex } = useCalendar();

    return (
        <>
            {TIME_ARRAY.map(el => (
                <motion.div className="flex w-full items-start" key={`${currDayOfTheMonth}_${el}`}
                    variants={prevDayOftheMonth < currDayOfTheMonth || prevMonthIndex < currMonthIndex ? moveNext : movePrev}
                    initial="initial" animate="animate">
                    <span className="text-gray-600 text-xs px-3 -mt-2 w-16">{el}</span>
                    <div className="flex-1 border-l border-b border-gray-300 h-14">

                    </div>
                </motion.div>
            ))}
        </>
    )
}

export default Index