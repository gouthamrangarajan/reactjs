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
      <div className="relative w-24 cursor-pointer rounded border-2 border-green-600 shadow transition-all duration-300 focus-within:ring-1 focus-within:ring-green-600 focus-within:ring-offset-2 focus-within:ring-offset-green-50">
        <select
          className="w-full cursor-pointer appearance-none bg-transparent px-3 py-1 outline-none"
          onChange={sortChanged}
          value={defaultValue}
        >
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
        <ChevronUpDownIcon className="absolute right-1 top-[0.4rem] -z-10 h-5 w-5 text-gray-500"></ChevronUpDownIcon>
      </div>
    </div>
  );
}
