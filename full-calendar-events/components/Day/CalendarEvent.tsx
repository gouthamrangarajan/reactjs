import { motion, PanInfo, useMotionValue } from "framer-motion"
import { useCallback, useContext, useEffect, useState } from "react";
import { EventsActionContext } from "../../contexts/EventsContextProvider";
import { calendarEventType } from "../../model"
import { calculateHeightFromTimeRange, calculateTimeRange, getMarginTopOfDayCalendarItem } from "../../util";


function CalendarEvent({ event: { from, to, title, id }, index }: CalendarEventPropsType) {
    const itemHeight = useMotionValue(calculateHeightFromTimeRange(from, to));
    let [timeRange, setTimeRange] = useState("");
    let dispatchEventAction = useContext(EventsActionContext);

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
        <>
            <motion.div className="absolute top-0 left-16 w-full bg-indigo-600 rounded -z-10" layout
                style={{ height: itemHeight }}>
                <div className="flex flex-col text-white py-1 px-3">
                    <span className="select-none">{title}</span>
                    <span className="text-xs italic select-none">{timeRange}</span>
                </div>
            </motion.div>
            <motion.div className="absolute top-0 left-16 w-full transition duration-300 hover:bg-red-400 cursor-ns-resize h-[4px] rounded z-10"
                style={{ marginTop: getMarginTopOfDayCalendarItem(itemHeight) }}
                layout="position"
                drag="y"
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDrag={handleDragBottom}
                onDragEnd={() => {
                    let toForDispatch = timeRange.substring(timeRange.indexOf("-") + 2);
                    dispatchEventAction({ name: "SET_TO", payload: { eventId: id, to: toForDispatch } });
                }}
                onDragStart={() => {

                }}
            ></motion.div>
        </>
    )
}
type CalendarEventPropsType = {
    event: calendarEventType;
    index: number;
}
export default CalendarEvent