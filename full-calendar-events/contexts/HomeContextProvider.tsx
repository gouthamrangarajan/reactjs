import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { calendarEventType, homeActionsContextType, homeContextType, positionType } from "../model";
import datesAndDraggedItemRelationReducer from "../reducers/datesAndDraggedItemRelationReducer";
import { EventsActionContext } from "./EventsContextProvider";

export const HomeContext = createContext<homeContextType>({
    positionOfDraggedItem: { x: 0, y: 0 },
    draggedItemData: { id: 0, title: '', randomIdForUIKey: '' },
    anyItemDragged: false,
    dragConstraintEl: null,
    datesAndDraggedItemRelation: []
});

export const HomeActionsContext = createContext<homeActionsContextType>({
    setDraggedItemData: () => { },
    setAnyItemDragged: () => { },
    setPositionOfDraggedItem: () => { },
    setDateAndDraggedItemRelation: () => { }
})

function HomeContextProvider({ children }: ContextProviderProps) {
    let [positionOfDraggedItem, setPositionOfDraggedItem] = useState<positionType>({ x: 0, y: 0 });
    let [draggedItemData, setDraggedItemData] = useState<calendarEventType>({ id: 0, title: '', randomIdForUIKey: '' });
    let [anyItemDragged, setAnyItemDragged] = useState(false);
    let [datesAndDraggedItemRelation, setDateAndDraggedItemRelation] = useReducer(datesAndDraggedItemRelationReducer, []);
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
        let mouseUpOrTouchEnd = (() => {
            setAnyItemDragged(false);
        });
        if (!anyItemDragged) {
            if (datesAndDraggedItemRelation.filter(el => el.draggedItemInPlace).length == 0) {
                eventDispatch({ name: 'REMOVE_AND_ADD', payload: draggedItemData.id })
            }
            setDateAndDraggedItemRelation({ name: 'RESET', payload: new Date() });
            setDraggedItemData({ id: 0, title: '', randomIdForUIKey: '' });
            setPositionOfDraggedItem({ x: 0, y: 0 });
        }
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('touchmove', touchMove);
        window.addEventListener('mouseup', mouseUpOrTouchEnd);
        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', touchMove);
            window.removeEventListener('mouseup', mouseUpOrTouchEnd);
        }
    }, [anyItemDragged]);

    return (
        <HomeContext.Provider value={{
            positionOfDraggedItem, draggedItemData, anyItemDragged,
            dragConstraintEl: containerEl as React.Ref<HTMLDivElement>,
            datesAndDraggedItemRelation
        }}>
            <HomeActionsContext.Provider value={{ setDraggedItemData, setAnyItemDragged, setPositionOfDraggedItem, setDateAndDraggedItemRelation }}>
                <div ref={containerEl as React.Ref<HTMLDivElement>}>
                    {children}
                </div>
            </HomeActionsContext.Provider>
        </HomeContext.Provider>
    )
}

type ContextProviderProps = {
    children: React.ReactNode | React.ReactNode[];
}

export default HomeContextProvider