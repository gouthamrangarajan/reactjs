import { Link, useLocation } from "@remix-run/react";
import HomeIcon from "@heroicons/react/24/solid/HomeIcon";
import Search from "./Search";

export default function Nav({
  menu,
}: {
  menu: React.ReactNode | React.ReactNode[];
}) {
  const { pathname } = useLocation();
  return (
    <nav
      className={` flex w-full  items-center space-x-3 px-4 py-2 lg:justify-center lg:px-8                         
                     ${
                       pathname != "/" && pathname != "/contact"
                         ? "sticky top-0 z-10 bg-slate-800 "
                         : "fixed bottom-0 bg-slate-800"
                     }`}
    >
      {pathname != "/" && (
        <Link
          prefetch="intent"
          to="/"
          className="rounded-full  p-2 text-white  transition duration-300 hover:bg-slate-700
        focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-gray-700"
          aria-label="Home"
        >
          <HomeIcon className="h-5 w-5"></HomeIcon>
        </Link>
      )}
      {menu && menu}
      {pathname != "/" && pathname != "/contact" && <Search></Search>}
      {pathname == "/" && (
        <Link
          to="/contact"
          prefetch="intent"
          className="rounded-md px-3  py-1 text-white transition duration-300
                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
        >
          Contact Me
        </Link>
      )}
    </nav>
  );
}
