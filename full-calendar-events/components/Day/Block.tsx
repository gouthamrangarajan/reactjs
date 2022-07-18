import { closestIndexTo } from "date-fns";
import { LegacyRef, useContext, useEffect, useRef, useState } from "react";
import { DragItemActionsContext, DragItemContext } from "../../contexts/DragItemContextProvider";
import { EventsActionContext } from "../../contexts/EventsContextProvider";
import useCalendar from "../../hooks/useCalendar";
import { TIME_ARRAY } from "../../model";
import { getDateTimeArrayFromTimeArray } from "../../util";

function Block({ index }: BlockPropsType) {
    let { positionOfDraggedItem, anyItemDragged, draggedItemData } = useContext(DragItemContext);
    let { setScreenToDraggedItemRelation } = useContext(DragItemActionsContext);
    let { currDayOfTheMonth, currMonthIndex, currYear } = useCalendar();
    let [showDrop, setShowDrop] = useState(false);
    let eventsDispatch = useContext(EventsActionContext);

    let refEl = useRef<HTMLDivElement>();

    useEffect(() => {
        let allDateTime = getDateTimeArrayFromTimeArray(currYear, currMonthIndex, currDayOfTheMonth);
        let indClosest = closestIndexTo(new Date(), allDateTime);
        if (index == indClosest && refEl.current && new Date().getDate() == allDateTime[index].getDate())
            refEl.current.scrollIntoView({ behavior: 'smooth', block: "center" });

    }, [index, currDayOfTheMonth, currMonthIndex, currYear]);

    useEffect(() => {
        let date = new Date(currYear, currMonthIndex, currDayOfTheMonth);
        if (!anyItemDragged && showDrop) { //dropped here            
            let from = TIME_ARRAY[index];
            let to = TIME_ARRAY[index + 1];
            if (!to)
                to = "12 AM"
            eventsDispatch({ name: 'SET_DATETIME', payload: { id: draggedItemData.id, date, from, to } })
            setShowDrop(false);
        }
    }, [anyItemDragged, eventsDispatch, draggedItemData.id, showDrop, currYear, currMonthIndex, currDayOfTheMonth, index]);

    useEffect(() => {
        if (refEl.current) {
            let { x: elX, y: elY, height: elHeight, width: elWidth } =
                refEl.current.getBoundingClientRect();
            let date = new Date(currYear, currMonthIndex, currDayOfTheMonth);
            let from = TIME_ARRAY[index];
            let to = TIME_ARRAY[index + 1];
            if (!to)
                to = "12 AM"
            if (positionOfDraggedItem.x >= elX && positionOfDraggedItem.x <= (elX + elWidth)
                && positionOfDraggedItem.y >= elY && positionOfDraggedItem.y <= (elY + elHeight)) {
                setShowDrop(true);
                setScreenToDraggedItemRelation({ name: 'IN_PLACE', payload: { date, from, to } });
            }
            else {
                setShowDrop(false);
                setScreenToDraggedItemRelation({ name: 'OUT_PLACE', payload: { date, from, to } });
            }
        }
    }, [positionOfDraggedItem.x, positionOfDraggedItem.y,
        setScreenToDraggedItemRelation, currYear,
        currMonthIndex, currDayOfTheMonth, index]);

    return (
        <div className={`flex-1 h-14 ${showDrop ? "border-2 border-dashed border-indigo-500" :
            "border-b border-gray-300"}`}
            ref={refEl as LegacyRef<HTMLDivElement>}>
        </div>
    )
}

type BlockPropsType = {
    index: number
}

export default Block