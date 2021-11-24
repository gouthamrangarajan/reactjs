import { DownloadIcon } from "@heroicons/react/solid";
const DownloadResume = () => {
  return (
    <div
      className="bg-white py-1 px-3 lg:py-2 lg:px-4 
    xl:py-4 xl:px-6 rounded-lg flex space-x-2 font-semibold text-indigo-600 text-lg
    items-center w-full lg:w-48 justify-between"
    >
      <span>Resume</span>
      <a href="/Goutham Rangarajan.docx">
        <DownloadIcon className="w-5 h-5"></DownloadIcon>
      </a>
    </div>
  );
};

export default DownloadResume;
