import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import TitleAndSearch from "../components/TitleAndSearch";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Loader from "../components/Loader";
import useApi from "../hooks/useApi";
import { motion } from "framer-motion";

const getDisplayData = (usersData, filterTxt, sortInfo) => {
  filterTxt = filterTxt.trim().toLowerCase();
  const { key, order } = sortInfo;
  return usersData
    .filter(
      (el) =>
        !filterTxt ||
        el.name.toLowerCase().includes(filterTxt.toLowerCase()) ||
        el.username.toLowerCase().includes(filterTxt.toLowerCase()) ||
        el.email.toLowerCase().includes(filterTxt.toLowerCase())
    )
    .sort((a, b) => {
      if (a[key] == b[key]) return 0;
      else if (order == "asc") return a[key] > b[key] ? 1 : -1;
      else return a[key] < b[key] ? 1 : -1;
    });
};

const UsersTable = () => {
  const [usersData, seUsersData] = useState([]);
  const [filterTxt, setFilterTxt] = useState("");
  const [sortInfo, setSortInfo] = useState({
    key: "name",
    order: "asc",
    prevKey: "",
  });
  const { data, loading } = useApi(
    "https://jsonplaceholder.typicode.com/users"
  );
  useEffect(() => {
    if (data) {
      let jsonDt = data.slice(0, 100);
      seUsersData(jsonDt);
    }
  }, [data]);

  const changeSort = (key) => {
    let newSortInfo = {
      prevKey: sortInfo.key,
      key: key,
      order: sortInfo.key == key && sortInfo.order == "asc" ? "desc" : "asc",
    };
    setSortInfo(newSortInfo);
  };

  return (
    <Layout>
      <TitleAndSearch
        title="Jsonplaceholder users"
        srchAction={setFilterTxt}
      ></TitleAndSearch>
      {loading && <Loader></Loader>}
      <table className="w-full">
        <thead className="text-left cursor-pointer">
          <tr className="border-b border-gray-300">
            {[
              {
                display: "Name",
                key: "name",
                className: "w-1/2 lg:w-1/3 py-1 px-3 border-r border-gray-300",
              },
              {
                display: "User Name",
                key: "username",
                className:
                  "w-1/2 lg:w-1/3 py-1 px-3  lg:border-r lg:border-gray-300",
              },
              {
                display: "Email",
                key: "email",
                className: "hidden lg:flex py-1 px-3",
              },
            ].map(({ className, key, display }) => (
              <th
                className={className}
                key={key}
                onClick={() => changeSort(key)}
              >
                <div className="flex justify-between items-center w-full">
                  <span>{display}</span>
                  {sortInfo.key == key && (
                    <span className="relative">
                      {sortInfo.order == "asc" ? (
                        <motion.span
                          className={`absolute top-0 -mt-2 right-0 text-gray-600`}
                          initial={
                            sortInfo.prevKey == key
                              ? { rotate: 90 }
                              : { opacity: 0 }
                          }
                          animate={{ rotate: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          key={1}
                        >
                          <FaAngleUp className="w-4 h-4"></FaAngleUp>
                        </motion.span>
                      ) : (
                        <motion.span
                          className={`absolute top-0 -mt-2 right-0 text-gray-600`}
                          initial={{ rotate: -90 }}
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.3 }}
                          key={2}
                        >
                          <FaAngleDown className=" w-4 h-4"></FaAngleDown>
                        </motion.span>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getDisplayData(usersData, filterTxt, sortInfo).map(
            ({ name, username, email, id }, index) => (
              <motion.tr
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                key={id}
                className={`cursor-pointer  ${
                  (index + 1) % 2 == 0 && "bg-gray-200 rounded"
                }`}
                layout
              >
                <td className={`py-1 px-3 rounded-l`}>{name}</td>
                <td className={`py-1 px-3 rounded-r lg:rounded-none`}>
                  {username}
                </td>
                <td className={`hidden lg:flex  py-1 px-3 rounded-r`}>
                  {email}
                </td>
              </motion.tr>
            )
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default UsersTable;
