import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Popup from "../components/Popup";
import Loader from "../components/Loader";
import useApi from "../hooks/useApi";
const Modal = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showTablePopup, setShowTablePopup] = useState(false);
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [jsonplaceholderData, setJsonplaceholderData] = useState([]);
  const { loading, data } = useApi(
    "https://jsonplaceholder.typicode.com/todos"
  );
  useEffect(async () => {
    if (data) {
      let jsonDt = data.slice(0, 100);
      setJsonplaceholderData(jsonDt);
    }
  }, [data]);
  return (
    <>
      <Popup
        show={showPopup}
        title={"Simple Message Modal"}
        close={() => setShowPopup(false)}
        size="small"
      >
        <div className="flex mt-2 py-2 px-4">
          <span className="text-gray-700">
            Click outside the box to close the modal
          </span>
        </div>
      </Popup>
      <Popup
        show={showTablePopup}
        title={"Modal with Table"}
        close={() => setShowTablePopup(false)}
      >
        <div className="table__container h-96 overflow-y-auto mt-2 py-1 lg:py-2 px-3 lg:px-4">
          {loading && <Loader></Loader>}
          <table className="w-full">
            <thead className="text-left cursor-pointer">
              <tr className="border-b border-gray-300">
                <th className="w-1/2 py-1 px-3">
                  <div className="flex justify-between items-center">
                    <span>Title</span>
                  </div>
                </th>
                <th className="w-1/2 py-1 px-3 "></th>
              </tr>
            </thead>
            <tbody>
              {jsonplaceholderData.map(({ title, completed, id }, index) => (
                <tr
                  key={id}
                  className={`cursor-pointer ${
                    (index + 1) % 2 == 0 && "bg-gray-200 rounded"
                  }`}
                >
                  <td className="py-1 px-3 rounded-l">{title}</td>
                  <td className="py-1 px-3 flex items-center w-full justify-center h-full rounded-r">
                    {completed ? (
                      <FaCheck className="w-4 h-4 text-green-700"></FaCheck>
                    ) : (
                      <FaTimes className="w-4 h-4 text-red-700"></FaTimes>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Popup>
      <Popup
        show={showActionPopup}
        title={"Modal with Action"}
        close={() => setShowActionPopup(false)}
        size="small"
      >
        <div className="flex mt-2 py-2 px-4">
          <span className="text-gray-700">
            Click outside the box to close the modal
          </span>
        </div>
        <div className="w-full pt-1">
          <div className="flex justify-end w-full items-center space-x-2 border-t border-gray-300 pt-1">
            <button
              className="appearance-none outline-none py-2 px-4 rounded hover:bg-gray-100 
                focus:ring focus:ring-gray-100 transition-all duration-300 ease-in"
            >
              Action 1
            </button>
            <button
              className="appearance-none outline-none py-2 px-4 rounded hover:bg-gray-100 
                focus:ring focus:ring-gray-100 transition-all duration-300 ease-in"
            >
              Action 2
            </button>
          </div>
        </div>
      </Popup>
      <Layout>
        <div className="flex w-full">
          <span className="text-green-700 font-semibold text-lg">Modal</span>
        </div>
        <div className="flex items-center h-20 space-x-2">
          {[
            { display: "Show Simple", Action: () => setShowPopup(true) },
            { display: "Show Table", Action: () => setShowTablePopup(true) },
            { display: "Show Action", Action: () => setShowActionPopup(true) },
          ].map(({ display, Action }) => (
            <button
              className="outline-none appearance-none py-2 px-4 bg-indigo-500 hover:opacity-90 rounded text-white shadow 
                    focus:ring focus:ring-indigo-300 transition-all ease-in duration-300"
              onClick={Action}
              key={display}
            >
              {display}
            </button>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Modal;
