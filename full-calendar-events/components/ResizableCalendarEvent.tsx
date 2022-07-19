import { closestIndexTo } from "date-fns";
import { motion, PanInfo, useMotionValue } from "framer-motion"
import { useCallback, useContext, useEffect, useState } from "react";
import { DragItemActionsContext, DragItemContext } from "../contexts/DragItemContextProvider";
import { EventsActionContext } from "../contexts/EventsContextProvider";
import { calendarEventType } from "../model"
import { calculateHeightFromTimeRange, calculateTimeRange, getDateTimeArrayFromTimeArray, getDateTimeFromDateAndTime, getMarginTopForTime } from "../util";


function ResizableCalendarEvent({ event, widthAndLeft }: ResizableCalendarEventPropsType) {
    const itemHeight = useMotionValue(calculateHeightFromTimeRange(event.from, event.to));
    let [timeRange, setTimeRange] = useState("");
    let dispatchEventAction = useContext(EventsActionContext);
    let { dragConstraintEl } = useContext(DragItemContext);
    let { setAnyItemDragged, setDraggedItemData } = useContext(DragItemActionsContext);

    const handleDragBottom = useCallback((ev: MouseEvent | TouchEvent, info: PanInfo) => {
        let newHeight = itemHeight.get() + info.delta.y;
        itemHeight.set(newHeight);
        let index: number | undefined;
        if (event.date) {
            let dtTime = getDateTimeFromDateAndTime(event.date.getFullYear(), event.date.getMonth(), event.date.getDate(), event.from);
            index = closestIndexTo(dtTime, getDateTimeArrayFromTimeArray(event.date.getFullYear(), event.date.getMonth(), event.date.getDate()));
        }
        if (!index)
            index = 0;
        let calculatedTimeRange = calculateTimeRange(newHeight, event.from, index);
        if (calculatedTimeRange != event.from) {
            calculatedTimeRange = checkAndAppend12AMToFrom(calculatedTimeRange);
            setTimeRange(calculatedTimeRange);
        }

    }, [event.from, itemHeight, event.date]);

    useEffect(() => {
        setTimeRange(checkAndAppend12AMToFrom(`${event.from} - ${event.to}`));
    }, [event.from, event.to]);

    return (
        <>
            <motion.div className={`absolute top-0 ${widthAndLeft ? widthAndLeft : "left-16 w-full"}  bg-indigo-600 rounded flex flex-col justify-between p-0`}
                layout
                drag
                whileDrag={{ scale: 0.9 }} dragConstraints={dragConstraintEl as React.RefObject<Element>}
                // onDrag={callBackDrag}// does not work
                onDragEnd={() => {
                    setAnyItemDragged(false);
                }}
                onDragStart={() => {
                    setAnyItemDragged(true);
                    setDraggedItemData(event);
                }}
                style={{ height: itemHeight, marginTop: getMarginTopForTime(event.from, false) }}>
                <div className="flex flex-col text-white py-1 px-3">
                    <span className="select-none">{event.title}</span>
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
                            dispatchEventAction({ name: "SET_TO", payload: { eventId: event.id, to: toForDispatch } });
                        }}
                        onDragStart={() => {

                        }}
                    ></motion.div>
                </div>
            </motion.div>
        </>
    )
}
type ResizableCalendarEventPropsType = {
    event: calendarEventType;
    widthAndLeft?: string;
}
export default ResizableCalendarEvent

const checkAndAppend12AMToFrom = (calculatedTimeRange: string): string => {
    if (!!calculatedTimeRange) {
        if (calculatedTimeRange.startsWith(" :"))
            return `12${calculatedTimeRange}`;
        if (calculatedTimeRange.startsWith(" -"))
            return `12 AM ${calculatedTimeRange}`;
    }
    return calculatedTimeRange;
}