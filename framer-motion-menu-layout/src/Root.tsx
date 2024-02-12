import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex h-full w-full  gap-2 bg-slate-100">
      <div className="flex h-full flex-col gap-10 bg-slate-700 py-10 pl-20 text-white">
        <NavLink
          to="/home"
          className="relative h-10 cursor-pointer rounded-l-full px-4 py-2 outline-none
                    hover:underline hover:underline-offset-4 focus:underline focus:underline-offset-4"
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <motion.div
                  layoutId="active__menu"
                  className="active__menu absolute left-0 top-0 h-full w-full rounded-l-full bg-slate-100"
                ></motion.div>
                <span className="absolute left-0 top-0 w-full px-4 py-2 text-slate-600">
                  Home
                </span>
              </>
            ) : (
              <span>Home</span>
            )
          }
        </NavLink>
        <NavLink
          to="/menu1"
          className="relative h-10 cursor-pointer rounded-l-full px-4 py-2 outline-none hover:underline 
                    hover:underline-offset-4 focus:underline focus:underline-offset-4 "
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <motion.div
                  layoutId="active__menu"
                  className="active__menu absolute left-0 top-0 h-full w-full rounded-l-full bg-slate-100"
                ></motion.div>
                <span className="absolute left-0 top-0 w-full px-4 py-2 text-slate-600">
                  Menu 1
                </span>
              </>
            ) : (
              <span>Menu 1</span>
            )
          }
        </NavLink>
        <NavLink
          to="/menu2"
          className="relative h-10 cursor-pointer rounded-l-full px-4 py-2 outline-none 
                    hover:underline hover:underline-offset-4 focus:underline focus:underline-offset-4"
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <motion.div
                  layoutId="active__menu"
                  className="active__menu absolute left-0 top-0 h-full w-full rounded-l-full bg-slate-100"
                ></motion.div>
                <span className="absolute left-0 top-0 w-full px-4 py-2 text-slate-600">
                  Menu 2
                </span>
              </>
            ) : (
              <span>Menu 2</span>
            )
          }
        </NavLink>
        <NavLink
          to="/menu3"
          className="relative h-10 cursor-pointer rounded-l-full px-4 py-2 outline-none 
                    hover:underline hover:underline-offset-4 focus:underline focus:underline-offset-4"
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <motion.div
                  layoutId="active__menu"
                  className="active__menu absolute left-0 top-0 h-full w-full rounded-l-full bg-slate-100"
                ></motion.div>
                <span className="absolute left-0 top-0 w-full px-4 py-2 text-slate-600">
                  Menu 3
                </span>
              </>
            ) : (
              <span>Menu 3</span>
            )
          }
        </NavLink>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
