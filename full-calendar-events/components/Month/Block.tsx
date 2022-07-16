import { LegacyRef, useContext, useEffect, useRef, useState } from "react";
import { EventsActionContext } from "../../contexts/EventsContextProvider";
import { DragItemActionsContext, DragItemContext } from "../../contexts/DragItemContextProvider";


function Block({ children, date, allowDrop }: BlockPropsType) {
    let tdEl = useRef<HTMLTableDataCellElement>();
    let { positionOfDraggedItem, anyItemDragged, draggedItemData } = useContext(DragItemContext);
    let { setDateAndDraggedItemRelation } = useContext(DragItemActionsContext);
    let [showDrop, setShowDrop] = useState(false);
    let dispatch = useContext(EventsActionContext);

    useEffect(() => {
        if (!anyItemDragged && showDrop) { //dropped here            
            dispatch({ name: 'SET_DATE', payload: { id: draggedItemData.id, date } })
            setShowDrop(false);
        }
    }, [anyItemDragged, date, dispatch, draggedItemData.id, showDrop]);

    useEffect(() => {
        if (tdEl.current && allowDrop) {
            let { x: elX, y: elY, height: elHeight, width: elWidth } =
                tdEl.current.getBoundingClientRect();

            if (positionOfDraggedItem.x >= elX && positionOfDraggedItem.x <= (elX + elWidth)
                && positionOfDraggedItem.y >= elY && positionOfDraggedItem.y <= (elY + elHeight)) {
                setShowDrop(true);
                setDateAndDraggedItemRelation({ name: 'IN_PLACE', payload: date });
            }
            else {
                setShowDrop(false);
                setDateAndDraggedItemRelation({ name: 'OUT_PLACE', payload: date });
            }
        }
    }, [positionOfDraggedItem.x, positionOfDraggedItem.y, allowDrop, setDateAndDraggedItemRelation, date]);

    return (
        <td className={`text-sm cursor-pointer transition-all duration-300
         ${showDrop ? "border-2 border-dashed border-indigo-500" :
                "border-gray-300 border-l border-b"}`}
            ref={tdEl as LegacyRef<HTMLTableDataCellElement>}
        >
            <div className={`flex flex-col space-y-1 items-center h-32 
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
}
export default Block