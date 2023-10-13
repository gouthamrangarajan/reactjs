import { Link, useLocation } from "@remix-run/react";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";

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
                       pathname != "/"
                         ? "sticky top-0 z-10 bg-slate-800 "
                         : "fixed bottom-0 bg-slate-800"
                     }`}
    >
      {pathname != "/" && (
        <Link
          to="/"
          className="rounded-full  p-1 text-white  transition duration-300 hover:bg-slate-700
        focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-gray-700"
        >
          <ArrowLeftIcon className="h-5 w-5"></ArrowLeftIcon>
        </Link>
      )}
      {menu && menu}
    </nav>
  );
}
