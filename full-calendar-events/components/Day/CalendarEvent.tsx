import { closestIndexTo } from "date-fns";
import { motion, PanInfo, useMotionValue } from "framer-motion"
import { useCallback, useContext, useEffect, useState } from "react";
import { EventsActionContext } from "../../contexts/EventsContextProvider";
import { calendarEventType } from "../../model"
import { calculateHeightFromTimeRange, calculateTimeRange, getDateTimeArrayFromTimeArray, getDateTimeFromDateAndTime, getMarginTopForTime } from "../../util";


function CalendarEvent({ event: { date, from, to, title, id } }: CalendarEventPropsType) {
    const itemHeight = useMotionValue(calculateHeightFromTimeRange(from, to));
    let [timeRange, setTimeRange] = useState("");
    let dispatchEventAction = useContext(EventsActionContext);

    const handleDragBottom = useCallback((ev: MouseEvent | TouchEvent, info: PanInfo) => {
        let newHeight = itemHeight.get() + info.delta.y;
        itemHeight.set(newHeight);
        let index: number | undefined;
        if (date) {
            let dtTime = getDateTimeFromDateAndTime(date.getFullYear(), date.getMonth(), date.getDate(), from);
            index = closestIndexTo(dtTime, getDateTimeArrayFromTimeArray(date.getFullYear(), date.getMonth(), date.getDate()));
        }
        if (!index)
            index = 0;
        let calculatedTimeRange = calculateTimeRange(newHeight, from, index);
        if (calculatedTimeRange != from)
            setTimeRange(calculatedTimeRange);

    }, [from, itemHeight, date]);

    useEffect(() => {
        setTimeRange(`${from} - ${to}`);
    }, [from, to]);

    return (
        <>
            <motion.div className="absolute top-0 left-16 w-full bg-indigo-600 rounded flex flex-col justify-between p-0"
                layout
                style={{ height: itemHeight, marginTop: getMarginTopForTime(from, false) }}>
                <div className="flex flex-col text-white py-1 px-3">
                    <span className="select-none">{title}</span>
                    <span className="text-xs italic select-none">{timeRange}</span>
                </div>
                <div className="flex-1 flex items-end">
                    <motion.div className="w-full transition duration-300 bg-indigo-300 
                            cursor-ns-resize h-[4px] rounded"
                        drag="y"
                        dragConstraints={{ left: 0, top: 0, bottom: 0, right: 0 }}
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
                </div>
            </motion.div>
        </>
    )
}
type CalendarEventPropsType = {
    event: calendarEventType;
}
export default CalendarEvent