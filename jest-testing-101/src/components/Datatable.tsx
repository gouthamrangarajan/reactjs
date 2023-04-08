import { userType } from "@/pages";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Datatable({ records }: { records: userType[] }) {
  const [srchTxt, setSrchTxt] = useState("");
  const [ftDt, setFtDt] = useState<userType[]>(records);
  useEffect(() => {
    let dt = [...records];
    if (srchTxt) {
      let srch = srchTxt.trim().toLowerCase();
      dt = dt.filter(
        (el) =>
          el.email.toLowerCase().includes(srch) ||
          el.name.toLowerCase().includes(srch) ||
          el.username.toLowerCase().includes(srch) ||
          el.website.toLowerCase().includes(srch)
      );
    }
    setFtDt(dt);
  }, [records, srchTxt]);
  return (
    <motion.div
      className="bg-white rounded-lg py-4 px-6 w-full lg:w-8/12 mx-auto flex flex-col items-end gap-2"
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, type: "spring", damping: 7 },
      }}
    >
      <input
        type="text"
        className="outline-none appearance-none py-1 px-3 rounded  border-2 border-gray-500 
                    focus:shadow-inner focus:shadow-gray-100 transition-all duration-300 
                    placeholder:text-gray-600 placeholder:italic"
        placeholder="Search..."
        onChange={(ev) => {
          setSrchTxt(ev.target.value);
        }}
        name="searchUsers"
      />
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="py-1 px-3 font-semibold text-indigo-600 text-left">
              Name
            </th>
            <th className="py-1 px-3 font-semibold text-indigo-600 text-left">
              UserName
            </th>
            <th className="py-1 px-3 font-semibold text-indigo-600 text-left">
              Email
            </th>
            <th className="py-1 px-3 font-semibold text-indigo-600 text-left">
              Website
            </th>
          </tr>
        </thead>
        <tbody>
          {ftDt.map((el) => (
            <motion.tr
              className="shadow"
              key={el.email}
              layout="position"
              initial={{ opacity: 0, x: 2 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <td className="py-1 px-3">{el.name}</td>
              <td className="py-1 px-3">{el.username}</td>
              <td className="py-1 px-3">{el.email}</td>
              <td className="py-1 px-3">{el.website}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
