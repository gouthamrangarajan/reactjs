import { useContext } from "react";
import { CloudPageActionContext } from "../../contexts/CloudPageContextProvider";

const SearchMenu = () => {
  let dispatch = useContext(CloudPageActionContext);
  return (
    <div className="grid lg:grid-cols-2 w-full divide-x-0 lg:divide-x-2 divide-y-2 lg:divide-y-0">
      <div className="flex flex-col">
        <span className="text-white font-semibold underline tracking-wider">
          Providers
        </span>
        <div className="p-1 flex flex-col space-y-3">
          {["Firebase", "Netlify", "Cloudflare", "Vercel", "Azure"].map(
            (el) => (
              <button
                className="transition duration-300  text-white py-1 px-3 rounded-md
                            hover:ring-2 hover:ring-white text-left w-32
                            focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700"
                key={el}
                onClick={() => {
                  if (dispatch)
                    dispatch({
                      name: "SET_CLOUD_PROVIDER_FILTER",
                      payload: el,
                    });
                }}
              >
                {el}
              </button>
            )
          )}
        </div>
      </div>
      <div className="flex flex-col pt-3 lg:pt-0 pl-0 lg:pl-6">
        <span className="text-white font-semibold underline tracking-wider">
          Features
        </span>
        <div className="p-1 flex flex-col space-y-3">
          {["Chat", "Stock", "Drive", "Calendar", "Clone", "OpenAI"].map(
            (el) => (
              <button
                className="transition duration-300  text-white py-1 px-3 rounded-md
                                hover:ring-2 hover:ring-white text-left w-32
                                focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700"
                key={el}
                onClick={() => {
                  if (dispatch)
                    dispatch({
                      name: "SET_APPLICATION_TYPE_FILTER",
                      payload: el,
                    });
                }}
              >
                {el}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
