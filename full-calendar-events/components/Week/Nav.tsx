import React from 'react'
import useCalendar from '../../hooks/useCalendar'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import TodayBtn from '../TodayBtn';
import RouteBtns from '../RouteBtns';
import { format } from 'date-fns';

function Nav() {
    let { prevWeek, nextWeek, weekData } = useCalendar();

    return (
        <nav className='z-10 bg-white py-2 px-4 sticky top-0 border-b border-gray-300 h-16 flex items-center select-none'>
            <div className='flex items-center flex-1'>
                <img className="object-contain mr-4 h-10 rounded-full" src="/imgs/logo.png" alt="Logo" />
                <span className="text-xl font-semibold text-gray-600">Calendar</span>
                <div className='flex ml-16 space-x-6 items-center'>
                    <TodayBtn></TodayBtn>
                    <div className='flex space-x-3 items-center'>
                        <button className='appearance-none outline-none bg-white rounded-full p-1 transition duration-300 hover:opacity-90
                                    focus:bg-gray-100 text-gray-600 ' title='Previous Week'
                            onClick={prevWeek}>
                            <ChevronLeftIcon className='w-6 h-6'></ChevronLeftIcon>
                        </button>
                        <button className='appearance-none outline-none bg-white rounded-full p-1 transition duration-300 hover:opacity-90
                                    focus:bg-gray-100 text-gray-600' title='Next Week'
                            onClick={nextWeek}>
                            <ChevronRightIcon className='w-6 h-6'></ChevronRightIcon>
                        </button>
                    </div>
                    <span className='text-gray-600 text-lg font-semibold'>
                        {weekData.length == 7 && `${format(weekData[0], "dd MMM yyyy")}-${format(weekData[6], "dd MMM yyyy")}`}
                    </span>
                </div>
            </div>
            <div className='flex items-center'>
                <RouteBtns></RouteBtns>
            </div>
        </nav>
    )
}

export default Nav