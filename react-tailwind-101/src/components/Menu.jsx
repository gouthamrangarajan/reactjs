import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/userContext";

const Menu = () => {
  const { userValue } = useContext(UserContext);
  return (
    <div className="w-full py-1 px-3 bg-green-700 text-white sticky top-0 flex space-x-2 items-center z-10 overflow-x-scroll menu__container">
      {[
        { to: "/", name: "Photos" },
        { to: "/users", name: "Users" },
        { to: "/modal", name: "Modal" },
        { to: "/form", name: "Form" },
        { to: "/context", name: "Context Api" },
      ].map((el) => (
        <NavLink
          className={`py-1 px-3 text-gray-100 hover:text-white transition-all ease-in duration-300 cursor-pointer`}
          activeStyle={{
            borderBottomWidth: "1px",
            color: "rgba(255, 255, 255, 1)",
          }}
          key={el.name}
          to={el.to}
          exact
        >
          {el.name}
        </NavLink>
      ))}

      <div className="flex-1 flex justify-end items-center ml-2">
        <AnimatePresence>
          {userValue.name && (
            <motion.span
              key={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Welcome {userValue.name} !
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;
