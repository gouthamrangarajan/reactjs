import { closestIndexTo } from "date-fns";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { moveNext, movePrev } from "../../animation";
import { EventsContext } from "../../contexts/EventsContextProvider";
import useCalendar from "../../hooks/useCalendar";
import { TIME_ARRAY } from "../../model";
import { getDateTimeArrayFromTimeArray, getDayEvents } from "../../util";
import ResizableCalendarEvent from "../ResizableCalendarEvent";
import AddResizableCalendarEvent from "./AddResizableCalendarEvent";
import Block from "../TimeRangeBlock";

function Index() {
    let { currDayOfTheMonth, prevDayOftheMonth, currMonthIndex, prevMonthIndex, currYear } = useCalendar();
    let [showAddCalendarEvent, setShowAddCalendarEvent] = useState(false);
    let [timeForAddCalendar, setTimeForAddCalendar] = useState("1 AM");
    let [indexForAddCalendar, setIndexForAddCalendar] = useState(0);
    let events = useContext(EventsContext);

    useEffect(() => {
        let allDateTime = getDateTimeArrayFromTimeArray(currYear, currMonthIndex, currDayOfTheMonth);
        if (new Date().getDate() == allDateTime[0].getDate()
            && new Date().getMonth() == allDateTime[0].getMonth()
            && new Date().getFullYear() == allDateTime[0].getFullYear()
        )
            setShowAddCalendarEvent(true);
        else
            setShowAddCalendarEvent(false);
        let indClosest = closestIndexTo(new Date(), allDateTime);
        if (indClosest) {
            setIndexForAddCalendar(indClosest);
            setTimeForAddCalendar(TIME_ARRAY[indClosest])
        }
    }, [currDayOfTheMonth, currMonthIndex, currYear]);

    return (
        <>
            {TIME_ARRAY.map((el, ind) => (
                <motion.div className="flex w-full items-start" key={`${currDayOfTheMonth}_${el}`}
                    variants={prevDayOftheMonth < currDayOfTheMonth || prevMonthIndex < currMonthIndex ? moveNext : movePrev}
                    initial="initial" animate="animate">
                    <span className="text-gray-600 text-xs px-3 -mt-2 w-16 select-none">{el}</span>
                    <Block index={ind} date={new Date(currYear, currMonthIndex, currDayOfTheMonth)}
                        autoScrollToCurrTime={true}></Block>
                </motion.div>
            ))}
            {showAddCalendarEvent && <AddResizableCalendarEvent time={timeForAddCalendar} index={indexForAddCalendar}></AddResizableCalendarEvent>}
            {getDayEvents(events, currYear, currMonthIndex, currDayOfTheMonth).map(el => (
                <ResizableCalendarEvent key={el.randomIdForUIKey} event={el}></ResizableCalendarEvent>
            ))}
        </>
    )
}

export default Index