import React, { useContext } from 'react'
import { EventsContext } from "../../contexts/EventsContextProvider"
import CalendarEvent from './CalendarEvent';

function SidePanel() {
    let events = useContext(EventsContext);
    return (
        <div className='hidden lg:flex lg:w-1/6 py-2 px-4  text-gray-700 flex-col pt-12 space-y-4
                        h-screen  border-r border-gray-300'>
            <span className="text-gray-600 font-semibold select-none">Event List</span>
            {events.filter(el => !el.date).map(el => (
                <CalendarEvent info={el} key={el.randomIdForUIKey} width="w-11/12" padding="py-2 px-4"></CalendarEvent>
            ))}
        </div>
    )
}

export default SidePanel