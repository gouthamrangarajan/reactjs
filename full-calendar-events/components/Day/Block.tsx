import { closestIndexTo } from "date-fns";
import { LegacyRef, useEffect, useRef } from "react";
import useCalendar from "../../hooks/useCalendar";
import { getDateTimeArrayFromTimeArray } from "../../util";

function Block({ index }: BlockPropsType) {
    let refEl = useRef<HTMLDivElement>();
    let { currDayOfTheMonth, currMonthIndex, currYear } = useCalendar();

    useEffect(() => {
        let allDateTime = getDateTimeArrayFromTimeArray(currYear, currMonthIndex, currDayOfTheMonth);
        let indClosest = closestIndexTo(new Date(), allDateTime);
        if (index == indClosest && refEl.current && new Date().getDate() == allDateTime[index].getDate())
            refEl.current.scrollIntoView({ behavior: 'smooth', block: "center" });

    }, [index, currDayOfTheMonth, currMonthIndex, currYear]);

    return (
        <div className="flex-1 border-l border-b border-gray-300 h-14"
            ref={refEl as LegacyRef<HTMLDivElement>}>
        </div>
    )
}

type BlockPropsType = {
    index: number
}

export default Block