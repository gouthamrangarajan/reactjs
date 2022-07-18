import { useRouter } from 'next/router';
import React from 'react'

function RouteBtns() {
    const router = useRouter();
    return (
        <>
            <button className='appearance-none outline-none bg-white  py-1 px-3 transition duration-300 
                               text-sm hover:opacity-90 focus:bg-gray-50 text-gray-700 border border-gray-300 '
                onClick={() => {
                    router.push("/");
                }}>Month</button>
            <button className='appearance-none outline-none bg-white  py-1 px-3 transition duration-300 
                               text-sm hover:opacity-90 focus:bg-gray-50 text-gray-700 border border-gray-300 
                                    disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-white'
                disabled>Week</button>

            <button className='appearance-none outline-none bg-white  py-1 px-3 transition duration-300 
                                text-sm hover:opacity-90 focus:bg-gray-50 text-gray-700 border border-gray-300 '
                onClick={() => {
                    router.push("/day");
                }}>Day</button>
        </>
    )
}

export default RouteBtns