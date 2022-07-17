import React, { Dispatch } from "react";

export type calendarDataType = Array<Array<{ date: number, ind: number | string }>>;

export type positionType = { x: number, y: number };

export type calendarEventType = { id: number, title: string, randomIdForUIKey: string, date?: Date }

export type dragItemContextType = {
    positionOfDraggedItem: positionType,
    draggedItemData: calendarEventType;
    anyItemDragged: boolean;
    dragConstraintEl: React.Ref<HTMLDivElement>;
    datesAndDraggedItemRelation: datesAndDraggedItemRelationType;
}
export type datesAndDraggedItemRelationType = Array<{ date: Date, draggedItemInPlace: boolean }>;


export type dragItemActionsContextType = {
    setDraggedItemData: (item: calendarEventType) => void;
    setAnyItemDragged: (val: boolean) => void;
    setPositionOfDraggedItem: (position: positionType) => void;
    setDateAndDraggedItemRelation: Dispatch<reducerActionType>;
}

export type calendarContextType = {
    currYear: number;
    currMonthIndex: number;
    currDayOfTheMonth: number;
}
export type calendarActionContextType = Dispatch<reducerActionType>;

export type reducerActionType = {
    name: string;
    payload: any;
}

export const MOCK_EVENTS: calendarEventType[] = [{
    id: 1,
    title: 'Event 1',
    randomIdForUIKey: (Math.random() * 100000000).toFixed(0)
}, {
    id: 2,
    title: 'Event 2',
    randomIdForUIKey: (Math.random() * 100000000).toFixed(0)
},
{
    id: 3,
    title: 'Event 3',
    randomIdForUIKey: (Math.random() * 100000000).toFixed(0)
}
    , {
    id: 4,
    title: 'Event 4',
    randomIdForUIKey: (Math.random() * 100000000).toFixed(0)
}];