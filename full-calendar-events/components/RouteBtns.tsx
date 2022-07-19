import { useRouter } from 'next/router';
import React from 'react'

function RouteBtns() {
    const router = useRouter();
    return (
        <>
            <button className={`appearance-none outline-none ${router.pathname == "/" ? "bg-gray-100" : "bg-white"} py-1 px-3 
                               transition duration-300 text-sm hover:opacity-90 focus:bg-gray-50 text-gray-700 border
                               border-gray-300 font-semibold`}
                onClick={() => {
                    router.push("/");
                }}>Month</button>
            <button className={`appearance-none outline-none ${router.pathname == "/week" ? "bg-gray-100" : "bg-white"}  py-1 px-3 
                                transition duration-300 text-sm hover:opacity-90 focus:bg-gray-50 text-gray-700 border
                                border-gray-300 font-semibold`}
                onClick={() => {
                    router.push("/week");
                }}>Week</button>

            <button className={`appearance-none outline-none ${router.pathname == "/day" ? "bg-gray-100" : "bg-white"}  py-1 px-3 
                                transition duration-300 text-sm hover:opacity-90 focus:bg-gray-50 text-gray-700 border
                                border-gray-300 font-semibold`}
                onClick={() => {
                    router.push("/day");
                }}>Day</button>
        </>
    )
}

export default RouteBtns