import React from 'react'

function Nav() {
    return (
        <nav className='z-10 bg-white py-2 px-4 sticky top-0 border-b border-gray-300 h-16 flex items-center'>
            <img className="object-contain mr-4 h-10 rounded-full" src="/imgs/logo.png" />
            <span className="text-xl font-semibold text-gray-600">Calendar</span>
        </nav>
    )
}

export default Nav