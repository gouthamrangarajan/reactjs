import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { Fragment, useContext } from 'react'
import { CloudPageActionContext, CloudPageContext } from '../../contexts/CloudPageContext'
import SearchTxt from '../SearchTxt'
import SearchMenu from './SearchMenu'

const NavSearch = () => {
    let dispatch = useContext(CloudPageActionContext);
    let { textFilter } = useContext(CloudPageContext);
    return (
        <>
            <div className="flex-1 text-white flex space-x-3 relative">
                <button className="appearance-none oultline-none py-1 px-3 rounded-md transition duration-300
                    hover:ring-2 hover:ring-white
                    focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700"
                    onClick={() => {
                        if (dispatch)
                            dispatch({ name: "RESET_ALL" });
                    }}>
                    All
                </button>
                <Popover>
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={`
                ${open ? '' : 'text-opacity-90'}
                text-white group bg-transparent px-3 py-1 rounded-md inline-flex items-center text-base font-medium 
                    hover:text-opacity-100 focus:outline-none focus:ring-2 focus:ring-white
                    focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-gray-700`}
                            >
                                <span>Categories</span>
                                <ChevronDownIcon
                                    className={`${open ? '' : 'text-opacity-70'}
                                     ml-2 mt-1 h-5 w-5 text-white group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                    aria-hidden="true"
                                />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute z-10 top-9 left-6 lg:left-0 py-4 px-6 bg-slate-700 
                                    rounded-xl w-full  lg:w-7/12 xl:w-1/3 shadow-2xl">
                                    <SearchMenu></SearchMenu>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
            <div className="hidden md:inline-flex">
                <SearchTxt value={textFilter} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    if (dispatch)
                        dispatch({ name: "SET_TEXT_FILTER", payload: ev.target.value })
                }}></SearchTxt>
            </div>
        </>
    )
}

export default NavSearch