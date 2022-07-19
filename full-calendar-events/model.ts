import React, { Dispatch } from "react";

export type calendarDataType = Array<Array<{ date: number, ind: number | string }>>;
export type weekDataType = Date[];
export type positionType = { x: number, y: number };

export type calendarEventType = {
    id: number,
    title: string,
    randomIdForUIKey: string,
    date?: Date,
    from?: string,
    to?: string
}

export type dragItemContextType = {
    positionOfDraggedItem: positionType,
    draggedItemData: calendarEventType;
    anyItemDragged: boolean;
    dragConstraintEl: React.Ref<HTMLDivElement>;
    screenToDraggedItemRelation: screenToDraggedItemRelationType;
}
export type dayDragItemContextType = {
    dragConstraintEl: React.Ref<HTMLDivElement>;
}
export type screenToDraggedItemRelationType = Array<{ date: Date, draggedItemInPlace: boolean, from: string, to: string }>;


export type dragItemActionsContextType = {
    setDraggedItemData: (item: calendarEventType) => void;
    setAnyItemDragged: (val: boolean) => void;
    setPositionOfDraggedItem: (position: positionType) => void;
    setScreenToDraggedItemRelation: Dispatch<reducerActionType>;
}

export type calendarContextType = {
    currYear: number;
    currMonthIndex: number;
    currDayOfTheMonth: number;
    currWeekOfTheYear: number;
}
export type calendarActionContextType = Dispatch<reducerActionType>;

export type reducerActionType = {
    name: string;
    payload: any;
}
export const TIME_ARRAY = [
    '',
    '1 AM',
    '2 AM',
    '3 AM',
    '4 AM',
    '5 AM',
    '6 AM',
    '7 AM',
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
    '8 PM',
    '9 PM',
    '10 PM',
    '11 PM'
]
export const MOCK_EVENTS: calendarEventType[] = [{
    id: 1,
    title: 'Event 1',
    randomIdForUIKey: (Math.random() * 100000000).toFixed(0),
    from: "9 AM",
    to: "10 AM"
}, {
    id: 2,
    title: 'Event 2',
    randomIdForUIKey: (Math.random() * 100000000).toFixed(0),
    from: "9 AM",
    to: "10 AM"
},
{
    id: 3,
    title: 'Event 3',
    randomIdForUIKey: (Math.random() * 100000000).toFixed(0),
    from: "9 AM",
    to: "10 AM"
}
    , {
    id: 4,
    title: 'Event 4',
    randomIdForUIKey: (Math.random() * 100000000).toFixed(0),
    from: "9 AM",
    to: "10 AM"
}];