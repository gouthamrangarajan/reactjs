import React, { FormEvent, useContext, useRef } from 'react'
import { EventsActionContext } from '../../contexts/EventsContextProvider';

function QuickAddEvent() {
    let dispatch = useContext(EventsActionContext);
    let inpEl = useRef<HTMLInputElement>();
    let submit = (ev: FormEvent) => {
        ev.preventDefault();
        if (inpEl.current) {
            dispatch({ name: 'QUICK_ADD', payload: inpEl.current.value });
            inpEl.current.value = '';
        }
    }
    return (
        <>
            <span className="text-gray-600 font-semibold select-none">Quick Add</span>
            <form className="flex flex-col w-full p-1 select-none" onSubmit={submit}>
                <input type="text" className='appearane-none outline-none py-1 px-3 w-full rounded shadow transition duration-300
                     mt-1 focus:ring-2 focus:ring-green-600 border border-green-600 focus:border-transparent
                      placeholder:text-gray-400 placeholder:italic'  placeholder='Event Name'
                    ref={inpEl as React.Ref<HTMLInputElement>}></input>
                <button type="submit" className='appearane-none outline-none py-1 px-3 w-full rounded shadow transition duration-300 
                     mt-4 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 bg-green-600
                      text-white'>
                    ADD
                </button>
            </form>
        </>
    )
}

export default QuickAddEvent