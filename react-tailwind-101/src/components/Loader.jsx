import { ImSpinner8 } from "react-icons/im";
const Loader = () => {
  return (
    <div className=" relative w-full  flex items-center justify-center">
      <div className="absolute top-0 left-50">
        <div
          className=" flex items-center justify-center h-12 w-12 shadow-2xl
                     bg-gray-700  text-white rounded"
        >
          <ImSpinner8 className="w-8 h-8 animate-spin"></ImSpinner8>
        </div>
      </div>
    </div>
  );
};
export default Loader;
