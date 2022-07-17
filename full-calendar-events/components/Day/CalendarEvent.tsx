import { motion, PanInfo, useMotionValue } from "framer-motion"
import { useCallback, useEffect, useState } from "react";
import { calendarEventType } from "../../model"
import { calculateHeightFromTimeRange, calculateTimeRange } from "../../util";


function CalendarEvent({ event: { from, to, title }, index }: CalendarEventPropsType) {
    const itemHeight = useMotionValue(calculateHeightFromTimeRange(from, to));
    let [timeRange, setTimeRange] = useState("");

    const handleDragBottom = useCallback((ev: MouseEvent | TouchEvent, info: PanInfo) => {
        let newHeight = itemHeight.get() + info.delta.y;
        itemHeight.set(newHeight);
        let calculatedTimeRange = calculateTimeRange(newHeight, from, index);
        if (calculatedTimeRange != from)
            setTimeRange(calculatedTimeRange);

    }, [index, from, itemHeight]);

    useEffect(() => {
        setTimeRange(`${from} - ${to}`);
    }, [from, to]);

    return (
        <motion.div className="absolute top-0 left-16 w-full flex flex-col justify-between bg-indigo-600 rounded select-none" layout
            style={{ height: itemHeight }}>
            <div className="flex flex-col text-white py-1 px-3">
                <span>{title}</span>
                <span className="text-xs italic">{timeRange}</span>
            </div>
            {/* <motion.div className="w-full bg-indigo-600 cursor-ns-resize h-[1px] rounded"
                layout="position"
                drag="y"
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDrag={handleDragBottom}
                onDragEnd={() => {

                }}
                onDragStart={() => {

                }}
            ></motion.div> */}
        </motion.div>
    )
}
type CalendarEventPropsType = {
    event: calendarEventType;
    index: number;
}
export default CalendarEvent