import { LegacyRef, useContext, useEffect, useRef, useState } from "react";
import { EventsActionContext } from "../contexts/EventsContextProvider";
import { DragItemActionsContext, DragItemContext } from "../contexts/DragItemContextProvider";
import { useRouter } from "next/router";
import useCalendar from "../hooks/useCalendar";


function Block({ children, date, allowDrop, isWeekCalendar = false }: BlockPropsType) {
    let tdEl = useRef<HTMLTableDataCellElement>();
    let { positionOfDraggedItem, anyItemDragged, draggedItemData } = useContext(DragItemContext);
    let { setScreenToDraggedItemRelation } = useContext(DragItemActionsContext);
    let { setDate: setUseCalendarDate } = useCalendar();
    let [showDrop, setShowDrop] = useState(false);
    let eventsDispatch = useContext(EventsActionContext);

    const router = useRouter();

    useEffect(() => {
        if (!anyItemDragged && showDrop) { //dropped here            
            eventsDispatch({ name: 'SET_DATE', payload: { id: draggedItemData.id, date } })
            setShowDrop(false);
        }
    }, [anyItemDragged, date, eventsDispatch, draggedItemData.id, showDrop]);

    useEffect(() => {
        if (tdEl.current && allowDrop) {
            let { x: elX, y: elY, height: elHeight, width: elWidth } =
                tdEl.current.getBoundingClientRect();

            if (positionOfDraggedItem.x >= elX && positionOfDraggedItem.x <= (elX + elWidth)
                && positionOfDraggedItem.y >= elY && positionOfDraggedItem.y <= (elY + elHeight)) {
                setShowDrop(true);
                setScreenToDraggedItemRelation({ name: 'IN_PLACE', payload: { date, from: '', to: '' } });
            }
            else {
                setShowDrop(false);
                setScreenToDraggedItemRelation({ name: 'OUT_PLACE', payload: { date, from: '', to: '' } });
            }
        }
    }, [positionOfDraggedItem.x, positionOfDraggedItem.y, allowDrop, setScreenToDraggedItemRelation, date]);

    return (
        <td className={`text-sm cursor-pointer transition-all duration-300
         ${showDrop ? "border-2 border-dashed border-indigo-500" :
                "border-gray-300 border-l border-b"}`}
            ref={tdEl as LegacyRef<HTMLTableDataCellElement>}
            onDoubleClick={() => {
                setUseCalendarDate(date);
                router.push(`/day`);
            }}
        >
            <div className={`flex flex-col space-y-1 items-center ${isWeekCalendar ? "h-full" : "h-32"} 
                ${!anyItemDragged ? "overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-300"
                    : ""}`}>
                {children}
            </div>
        </td>
    )
}
type BlockPropsType = {
    children: React.ReactNode | React.ReactNode[];
    date: Date;
    allowDrop: boolean;
    isWeekCalendar?: boolean;
}
export default Block;