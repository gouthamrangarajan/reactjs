import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { useFetcher } from "react-router-dom";

export default function ItemAddForm({
  closeFormAction,
}: {
  closeFormAction: () => void;
}) {
  const fetcher = useFetcher();
  return (
    <div className="shadow-2xl rounded-t-lg bg-white py-2 lg:py-4 px-4 lg:px-6 flex flex-col w-full z-10">
      <div className="flex justify-between items-start border-b-2 border-gray-300">
        <span className="text-green-600 text-lg font-semibold">Add Item</span>
        <button
          className="appearance-none outline-none -mr-3 -mt-1 lg:-mt-3 rounded-full bg-gray-600 text-white hover:bg-opacity-90 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-gray-600 focus:ring-offset-gray-50 p-1"
          onClick={closeFormAction}
        >
          <XMarkIcon className="w-4 h-4"></XMarkIcon>
        </button>
      </div>
      <fetcher.Form method="POST" className="flex flex-col mt-6 gap-6">
        <input
          type="text"
          placeholder="Item e.g Apple"
          name="name"
          className="outline-none appearance-none py-1 border-b-2 border-gray-300 focus:border-green-600 transition-colors duration-300 placeholder:italic placeholder:text-gray-600"
        />

        <input
          type="number"
          placeholder="Quantity e.g 2"
          className="outline-none appearance-none py-1 border-b-2 border-gray-300 focus:border-green-600 transition-colors duration-300 placeholder:italic placeholder:text-gray-600"
          name="quantity"
        />
        <button
          type="submit"
          name="add"
          className="appearance-none outline-none uppercase flex justify-center rounded bg-green-600 text-white hover:bg-opacity-80 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-green-600 focus:ring-offset-green-50 py-1 px-3"
        >
          <span>Submit</span>
        </button>
      </fetcher.Form>
    </div>
  );
}
