import { closestIndexTo } from "date-fns";
import { LegacyRef, useContext, useEffect, useRef, useState } from "react";
import { EventsContext } from "../../contexts/EventsContextProvider";
import useCalendar from "../../hooks/useCalendar";
import { getDateTimeArrayFromTimeArray, getDayEvents } from "../../util";
import AddCalendarEvent from "./AddCalendarEvent";
import CalendarEvent from "./CalendarEvent";

function Block({ time, index }: BlockPropsType) {
    let refEl = useRef<HTMLDivElement>();
    let { currDayOfTheMonth, currMonthIndex, currYear } = useCalendar();
    let [showAddCalendarEvent, setShowAddCalendarEvent] = useState(false);
    let events = useContext(EventsContext);

    useEffect(() => {
        let allDateTime = getDateTimeArrayFromTimeArray(currYear, currMonthIndex, currDayOfTheMonth);
        let indClosest = closestIndexTo(new Date(), allDateTime);
        if (index == indClosest && refEl.current && new Date().getDate() == allDateTime[index].getDate()) {
            refEl.current.scrollIntoView({ behavior: 'smooth', block: "center" });
            setShowAddCalendarEvent(true);
        }
    }, [index, currDayOfTheMonth, currMonthIndex, currYear, time]);

    return (
        <div className="flex-1 border-l border-b border-gray-300 h-14"
            ref={refEl as LegacyRef<HTMLDivElement>}>
            {showAddCalendarEvent && <AddCalendarEvent time={time} index={index}></AddCalendarEvent>}
            {time != "" && getDayEvents(events, currYear, currMonthIndex, currDayOfTheMonth, time).map(el => (
                <CalendarEvent key={el.randomIdForUIKey} event={el} index={index}></CalendarEvent>
            ))}
        </div>
    )
}

type BlockPropsType = {
    time: string;
    index: number
}

export default Block