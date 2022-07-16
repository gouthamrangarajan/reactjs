import React, { createContext, useReducer, useState } from 'react'
import { calendarActionContextType, calendarContextType } from '../model'
import calendarReducer from '../reducers/calendarReducer'

export const CalendarContext = createContext<calendarContextType>({
    currMonthIndex: new Date().getMonth(),
    currYear: new Date().getFullYear()
});

export const CalendarActionContext = createContext<calendarActionContextType>(() => { });

function CalendarContextProvider({ children }: calendarContextProviderPropsType) {
    let [state, dispatch] = useReducer(calendarReducer, { currMonthIndex: new Date().getMonth(), currYear: new Date().getFullYear() });
    let { currMonthIndex, currYear } = state;

    return (
        <CalendarContext.Provider value={{ currMonthIndex, currYear }}>
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