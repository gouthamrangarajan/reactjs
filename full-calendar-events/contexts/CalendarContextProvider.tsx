import React, { createContext, useReducer, useState } from 'react'
import { calendarActionContextType, calendarContextType } from '../model'
import calendarReducer from '../reducers/calendarReducer'

export const CalendarContext = createContext<calendarContextType>({
    currMonthIndex: new Date().getMonth(),
    currYear: new Date().getFullYear(),
    currDayOfTheMonth: new Date().getDate()
});

export const CalendarActionContext = createContext<calendarActionContextType>(() => { });

function CalendarContextProvider({ children }: calendarContextProviderPropsType) {
    let [state, dispatch] = useReducer(calendarReducer, {
        currMonthIndex: new Date().getMonth(),
        currYear: new Date().getFullYear(),
        currDayOfTheMonth: new Date().getDate()
    });
    let { currMonthIndex, currYear, currDayOfTheMonth } = state;

    return (
        <CalendarContext.Provider value={{ currMonthIndex, currYear, currDayOfTheMonth }}>
            <CalendarActionContext.Provider value={dispatch}>
                {children}
            </CalendarActionContext.Provider>
        </CalendarContext.Provider>
    )
}
type calendarContextProviderPropsType = {
    children: React.ReactNode | React.ReactNode[];
}
export default CalendarContextProvider