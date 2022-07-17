import { closestIndexTo } from "date-fns";
import { LegacyRef, useEffect, useRef, useState } from "react";
import useCalendar from "../../hooks/useCalendar";
import { getDateTimeArrayFromTimeArray } from "../../util";
import CalendarEvent from "./CalendarEvent";

function Block({ time, index }: BlockPropsType) {
    let el = useRef<HTMLDivElement>();
    let { currDayOfTheMonth, currMonthIndex, currYear } = useCalendar();
    let [showCalendarEvent, setShowCalendarEvent] = useState(false);

    useEffect(() => {
        let allDateTime = getDateTimeArrayFromTimeArray(currYear, currMonthIndex, currDayOfTheMonth);
        let indClosest = closestIndexTo(new Date(), allDateTime);
        if (index == indClosest && el.current && new Date().getDate() == allDateTime[index].getDate()) {
            el.current.scrollIntoView({ behavior: 'smooth', block: "center" });
            setShowCalendarEvent(true);
        }
        // else if (time == "9 AM" && new Date().getDate() != allDateTime[index].getDate()) {
        //     el.current?.scrollIntoView({ behavior: 'smooth', block: "center" });
        //     setShowCalendarEvent(true);
        // }

    }, [index, currDayOfTheMonth, currMonthIndex, currYear, time]);

    return (
        <div className="flex-1 border-l border-b border-gray-300 h-14"
            ref={el as LegacyRef<HTMLDivElement>}>
            {showCalendarEvent && <CalendarEvent time={time} index={index}></CalendarEvent>}
        </div>
    )
}

type BlockPropsType = {
    time: string;
    index: number
}

export default Block