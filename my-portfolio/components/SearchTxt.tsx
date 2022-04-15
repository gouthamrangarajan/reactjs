import { SearchIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import React from "react";

const SearchTxt: NextPage<searchTxtPropsType> = ({ value, onChange }) => {
    return (
        <div className="flex items-center py-1 px-3 transition duration-300
            focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-gray-700 
            rounded-md text-gray-700 bg-white">
            <input type="text" className="order-2 lg:order-1 flex-1 appearance-none outline-none bg-transparent lg:w-64"
                onChange={onChange} value={value} />
            <SearchIcon className="order-1 lg:order-2 w-6 h-6"></SearchIcon>
        </div>
    )
}
type searchTxtPropsType = {
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
export default SearchTxt;