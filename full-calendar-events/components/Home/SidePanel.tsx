import React, { useContext } from 'react'
import { EventsContext } from '../../contexts/EventsContextProvider';
import CalendarEvent from '../CalendarEvent';

function SidePanel() {
    let events = useContext(EventsContext);
    return (
        <div className='hidden lg:flex lg:w-1/6 py-2 px-4 pt-10 text-gray-700 flex-col mt-12 space-y-4'>
            <span className="text-gray-600 font-semibold">Event List</span>
            {events.filter(el => !el.date).map(el => (
                <CalendarEvent info={el} key={el.randomIdForUIKey} width="w-11/12" padding="py-2 px-4"></CalendarEvent>
            ))}
        </div>
    )
}

export default SidePanel