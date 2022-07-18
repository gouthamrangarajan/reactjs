import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { calendarEventType, dragItemActionsContextType, dragItemContextType, positionType } from "../model";
import screenToDraggedItemRelationReducer from "../reducers/screenToDraggedItemRelationReducer";
import { EventsActionContext } from "./EventsContextProvider";

export const DragItemContext = createContext<dragItemContextType>({
    positionOfDraggedItem: { x: 0, y: 0 },
    draggedItemData: { id: 0, title: '', randomIdForUIKey: '', from: '', to: '' },
    anyItemDragged: false,
    dragConstraintEl: null,
    screenToDraggedItemRelation: []
});

export const DragItemActionsContext = createContext<dragItemActionsContextType>({
    setDraggedItemData: () => { },
    setAnyItemDragged: () => { },
    setPositionOfDraggedItem: () => { },
    setScreenToDraggedItemRelation: () => { }
})

function DragItemContextProvider({ children }: ContextProviderProps) {
    let [positionOfDraggedItem, setPositionOfDraggedItem] = useState<positionType>({ x: 0, y: 0 });
    let [draggedItemData, setDraggedItemData] = useState<calendarEventType>({ id: 0, title: '', randomIdForUIKey: '', from: '', to: '' });
    let [anyItemDragged, setAnyItemDragged] = useState(false);
    let [screenToDraggedItemRelation, setScreenToDraggedItemRelation] = useReducer(screenToDraggedItemRelationReducer, []);
    let eventDispatch = useContext(EventsActionContext);

    let containerEl = useRef<HTMLDivElement>();


    useEffect(() => {
        let mouseMove = ((ev: MouseEvent) => {
            if (anyItemDragged)
                setPositionOfDraggedItem({ x: ev.x, y: ev.y });
        });
        let touchMove = ((ev: TouchEvent) => {
            if (anyItemDragged)
                setPositionOfDraggedItem({ x: ev.touches[0].clientX, y: ev.touches[0].clientY });
        });

        if (!anyItemDragged) {
            if (screenToDraggedItemRelation.filter(el => el.draggedItemInPlace).length == 0) {
                eventDispatch({ name: 'REMOVE_AND_ADD', payload: draggedItemData.id })
            }
            setScreenToDraggedItemRelation({ name: 'RESET', payload: new Date() });
            setDraggedItemData({ id: 0, title: '', randomIdForUIKey: '', from: '', to: '' });
            setPositionOfDraggedItem({ x: 0, y: 0 });
        }
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('touchmove', touchMove);
        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', touchMove);
        }
    }, [anyItemDragged]);

    return (
        <DragItemContext.Provider value={{
            positionOfDraggedItem, draggedItemData, anyItemDragged,
            dragConstraintEl: containerEl as React.Ref<HTMLDivElement>,
            screenToDraggedItemRelation
        }}>
            <DragItemActionsContext.Provider value={{
                setDraggedItemData, setAnyItemDragged,
                setPositionOfDraggedItem, setScreenToDraggedItemRelation
            }}>
                <div ref={containerEl as React.Ref<HTMLDivElement>}>
                    {children}
                </div>
            </DragItemActionsContext.Provider>
        </DragItemContext.Provider>
    )
}

type ContextProviderProps = {
    children: React.ReactNode | React.ReactNode[];
}

export default DragItemContextProvider