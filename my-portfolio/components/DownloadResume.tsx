import { DownloadIcon } from "@heroicons/react/solid";
import { NextPage } from "next";

const DownloadResume: NextPage = () => {  
  return (
    <div
      className={`dark:bg-slate-700 dark:text-gray-100 bg-white text-indigo-600 shadow py-1 px-3 lg:py-2 lg:px-4 
    xl:py-4 xl:px-6 rounded-lg flex space-x-2 font-semibold text-lg
    items-center w-full lg:w-48 justify-between`}
    >
      <span>Resume</span>
      <a href="/Goutham Rangarajan.docx" className="appearance-none outline-none rounded-lg 
          p-1 focus:ring-2 dark:focus:ring-gray-100 focus:ring-indigo-600
          transition duration-300 ease-in-out">
        <DownloadIcon className="w-5 h-5"></DownloadIcon>
      </a>
    </div>
  );
};

export default DownloadResume;
