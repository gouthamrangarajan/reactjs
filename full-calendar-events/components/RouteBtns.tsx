import { useRouter } from 'next/router';
import React from 'react'

function RouteBtns() {
    const router = useRouter();
    return (
        <>
            <button className={`appearance-none outline-none ${router.pathname == "/" ? "bg-blue-200 border-blue-300" :
                "bg-white border-gray-300"} py-1 px-3 transition duration-300 text-sm hover:opacity-90
                                 focus:bg-gray-50 text-gray-700 border font-semibold`}
                onClick={() => {
                    router.push("/");
                }}>Month</button>
            <button className={`appearance-none outline-none ${router.pathname == "/week" ? "bg-blue-200 border-blue-300" :
                "bg-white border-gray-300"} py-1 px-3 transition duration-300 text-sm hover:opacity-90
                                 focus:bg-gray-50 text-gray-700 border font-semibold`}
                onClick={() => {
                    router.push("/week");
                }}>Week</button>

            <button className={`appearance-none outline-none ${router.pathname == "/day" ? "bg-blue-200 border-blue-300" :
                "bg-white border-gray-300"} py-1 px-3 transition duration-300 text-sm hover:opacity-90
                                 focus:bg-gray-50 text-gray-700 border font-semibold`}
                onClick={() => {
                    router.push("/day");
                }}>Day</button>
        </>
    )
}

export default RouteBtns