import React, { createContext, Dispatch, useReducer } from 'react'
import { calendarEventType, MOCK_EVENTS, reducerActionType } from '../model'
import eventsReducer from '../reducers/eventsReducer'

export const EventsContext = createContext<calendarEventType[]>(MOCK_EVENTS);

export const EventsActionContext = createContext<Dispatch<reducerActionType>>(() => { });

function EventsContextProvider({ children }: EventsContextProviderPropsType) {
    let [state, dispatch] = useReducer(eventsReducer, MOCK_EVENTS)
    return (
        <EventsContext.Provider value={state}>
            <EventsActionContext.Provider value={dispatch}>
                {children}
            </EventsActionContext.Provider>
        </EventsContext.Provider>
    )
}
type EventsContextProviderPropsType = {
    children: React.ReactNode | React.ReactNode[]
}
export default EventsContextProvider