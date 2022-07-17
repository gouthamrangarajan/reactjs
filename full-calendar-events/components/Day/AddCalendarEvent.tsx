import { motion, PanInfo, useMotionValue } from "framer-motion"
import { useCallback, useState } from "react"
import { calculateTimeRange } from "../../util";

function CalendarEvent({ time, index }: AddCalendarEventPropsType) {
    let [timeRange, setTimeRange] = useState("");
    const itemHeight = useMotionValue(1);

    const handleDrag = useCallback((ev: MouseEvent | TouchEvent, info: PanInfo) => {
        let newHeight = itemHeight.get() + info.delta.y;
        itemHeight.set(newHeight);
        let calculatedTimeRange = calculateTimeRange(newHeight, time, index);
        if (calculatedTimeRange != time)
            setTimeRange(calculatedTimeRange);

    }, [index, time, itemHeight]);

    return (
        <motion.div className="absolute -top-2 left-14 w-full flex items-start" layout>
            <motion.div className="p-2 rounded-full bg-indigo-600 cursor-n-resize" layout="position"
                drag="y"
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDrag={handleDrag}
                onDragEnd={() => {

                }}
                onDragStart={() => {

                }}
            ></motion.div>
            <motion.div style={{ height: itemHeight }}
                className={`bg-indigo-600 flex-1 rounded mt-2 -z-10 text-white ${timeRange != "" ? "py-1 px-3 " : ""}`}>
                {timeRange && <span className="text-xs">{timeRange}</span>}
            </motion.div>
        </motion.div>
    )
}
type AddCalendarEventPropsType = {
    time: string;
    index: number;
}
export default CalendarEvent