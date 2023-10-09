import { motion } from "framer-motion";
import { headerTextParent, staggerParent } from "../utils/animationVariants";
import { Link, useLocation } from "@remix-run/react";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";

export default function Nav({
  menu,
}: {
  menu: React.ReactNode | React.ReactNode[];
}) {
  const { pathname } = useLocation();
  return (
    <motion.nav
      className={` flex w-full items-center space-x-3 px-4 py-2 lg:justify-center lg:px-8                          
                     ${
                       pathname != "/"
                         ? "sticky top-0 z-10 bg-slate-800 "
                         : "fixed bottom-0 bg-slate-800"
                     }`}
      variants={pathname != "/" ? headerTextParent : staggerParent}
      initial="hidden"
      animate="show"
    >
      {pathname != "/" && (
        <Link to="/">
          <a
            className="rounded-md p-2  text-white transition duration-300  hover:opacity-90
                                focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4"></ArrowLeftIcon>
          </a>
        </Link>
      )}
      {menu && menu}
    </motion.nav>
  );
}
