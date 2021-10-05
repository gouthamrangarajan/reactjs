import { FaCheck } from "react-icons/fa";

const Checkbox = ({ onChange, label, checked, name }) => {
  return (
    <div className="flex space-x-2 w-full items-center cursor-pointer">
      <div className="relative" onClick={onChange}>
        <input
          type="checkbox"
          name={name}
          className="appearance-none outline-none border-2 border-blue-500 rounded w-6 h-6 cursor-pointer
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></input>
        {checked && (
          <FaCheck className="w-4 h-4 absolute text-green-700 top-0 left-0 mt-1 ml-1"></FaCheck>
        )}
      </div>
      <label className="cursor-pointer -mt-1" onClick={onChange}>
        {label}
      </label>
    </div>
  );
};
export default Checkbox;
