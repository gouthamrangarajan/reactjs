import { motion, PanInfo, useMotionValue } from "framer-motion"
import { useCallback, useContext, useState } from "react"
import { fade } from "../../animation";
import { DragItemContext } from "../../contexts/Day/DragItemContextProvider";
import { calculateTimeRange, getMarginTopForTime } from "../../util";

function CalendarEvent({ time, index }: AddCalendarEventPropsType) {
    let [timeRange, setTimeRange] = useState("");
    let { dragConstraintEl } = useContext(DragItemContext);

    const itemHeight = useMotionValue(1);

    const handleDrag = useCallback((ev: MouseEvent | TouchEvent, info: PanInfo) => {
        let newHeight = itemHeight.get() + info.delta.y;
        itemHeight.set(newHeight);
        let calculatedTimeRange = calculateTimeRange(newHeight, time, index);
        if (calculatedTimeRange != time)
            setTimeRange(calculatedTimeRange);

    }, [index, time, itemHeight]);

    return (
        <motion.div className="absolute -top-2 left-12 w-full flex items-start"
            style={{ marginTop: getMarginTopForTime(time, false) }}
            variants={fade} initial="initial" animate="animate"
            layout>
            <motion.div className="p-2 rounded-full bg-indigo-600 cursor-n-resize" layout="position"
                drag="y"
                dragConstraints={dragConstraintEl as React.RefObject<Element>}
                dragElastic={0}
                dragMomentum={false}
                onDrag={handleDrag}
                onDragEnd={() => {

                }}
                onDragStart={() => {

                }}
            ></motion.div>
            <motion.div style={{ height: itemHeight }}
                className={`bg-indigo-600 flex-1 rounded mt-2 text-white ${timeRange != "" ? "py-1 px-3 " : ""}`}>
                {timeRange && <span className="text-xs select-none">{timeRange}</span>}
            </motion.div>
        </motion.div>
    )
}
type AddCalendarEventPropsType = {
    time: string;
    index: number;
}
export default CalendarEvent