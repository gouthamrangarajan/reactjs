import type { NextPage } from "next";
import { mediaType } from "../models/dataType";

const Media: NextPage<mediaPropType> = ({ allMedia }) => {  
  return (
    <div
      className={`dark:bg-slate-700 bg-white shadow py-1 px-3 lg:py-2 lg:px-4 
    xl:py-4 xl:px-6 rounded-lg flex flex-col font-semibold w-full lg:w-2/3 xl:w-1/2 space-y-2`}
    >
      <span className={`dark:text-gray-100 text-red-500 text-lg`}>Media</span>
      <div className="flex space-x-2 items-center">
        <div className="flex flex-col">
          {allMedia.map((el) => (
            <span className={`dark:text-sky-300 text-gray-700 text-sm md:text-base`} key={el.name}>
              {el.name}:
            </span>
          ))}
        </div>
        <div className="flex flex-col">
          {allMedia.map((el) => (
            <a
              className={`underline dark:text-sky-200 text-indigo-600 text-sm md:text-base`}
              target="_blank"
              rel="noreferrer"
              key={el.name}
              href={el.url}
            >
              {el.url}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
type mediaPropType = {
  allMedia: mediaType[];
};
export default Media;
