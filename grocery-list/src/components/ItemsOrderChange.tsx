import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ItemsOrderChange() {
  const sortChanged = (ev: ChangeEvent<HTMLSelectElement>) => {
    let sortUrl = `/?sort=${ev.target.value}`;
    navigate(sortUrl);
  };
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [defaultValue, setDefaultValue] = useState("name");
  useEffect(() => {
    let { sort } = Object.fromEntries(searchParams) as unknown as {
      sort: string;
    };
    if (sort) setDefaultValue(sort);
  }, [searchParams]);
  return (
    <div className="flex flex-row items-center gap-2">
      <label className="text-gray-700">Item(s) display order</label>
      <div className="relative cursor-pointer rounded w-24 shadow border-2 border-green-600 focus-within:ring-1 focus-within:ring-green-600 focus-within:ring-offset-2 focus-within:ring-offset-green-50 transition-all duration-300">
        <select
          className="appearance-none outline-none w-full cursor-pointer py-1 px-3 bg-transparent"
          onChange={sortChanged}
          value={defaultValue}
        >
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
        <ChevronUpDownIcon className="w-5 h-5 absolute top-[0.4rem] right-1 text-gray-500 -z-10"></ChevronUpDownIcon>
      </div>
    </div>
  );
}
