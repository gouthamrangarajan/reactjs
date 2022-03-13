import type { NextPage } from "next";
import { gitHubType } from "../models/dataType";

const Repos: NextPage<reposPropType> = ({ allRepos }) => {  
  return (
    <div
      className={`dark:bg-slate-700 bg-white shadow py-1 px-3 lg:py-2 lg:px-4 
        xl:py-4 xl:px-6 rounded-lg flex flex-col space-y-2 font-semibold w-full lg:w-48`}
    >
      <span className={`text-red-500 dark:text-gray-100 text-lg`}>Github Repos</span>
      <div className="flex space-x-2">
        <div className="flex flex-col">
          {allRepos.map(
            (el) =>
              el.name && (
                <a
                  className={`dark:text-sky-200 text-indigo-600 font-semibold`}
                  target="_blank"
                  rel="noreferrer"
                  key={el.name}
                  href={el.url}
                >
                  {el.name}
                </a>
              )
          )}
        </div>
      </div>
    </div>
  );
};
type reposPropType = {
  allRepos: gitHubType[];
};
export default Repos;
