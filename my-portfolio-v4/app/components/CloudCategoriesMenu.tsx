import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { Link } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { slideUp } from "~/utils/animationVariants";

export default function CloudCategoriesMenu() {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    let listener = () => setShowMenu(false);
    window.addEventListener("click", listener);
    return () => window.removeEventListener("click", listener);
  }, []);
  return (
    <div className="relative w-full" onClick={(ev) => ev.stopPropagation()}>
      <button
        className="flex items-center  gap-2 rounded-md px-3 py-1 text-white
  transition duration-300 hover:bg-slate-600 focus-visible:ring-2 focus-visible:ring-white
    focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
        onClick={() => setShowMenu((show) => !show)}
      >
        <span>Categories</span>
        <ChevronDownIcon className="mt-1 h-4 w-4"></ChevronDownIcon>
      </button>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="initial"
            className="absolute -left-6 top-9 z-10  w-full rounded bg-slate-700 px-6  py-4 shadow-2xl lg:left-0 lg:w-7/12 xl:w-1/3"
          >
            <div className="grid w-full divide-x-0 divide-y-2 lg:grid-cols-2 lg:divide-x-2 lg:divide-y-0">
              <div className="flex flex-col">
                <span className="font-semibold tracking-wider text-white underline underline-offset-2">
                  Providers
                </span>
                <div className="flex flex-col space-y-3 p-1">
                  {["Firebase", "Netlify", "Cloudflare", "Vercel"].map((el) => (
                    <Link
                      className="w-32 rounded-md px-3  py-1 text-white transition duration-300
                      hover:bg-slate-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
                      key={el}
                      to={`/cloud?category=${el}`}
                    >
                      {el}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col pl-0 pt-3 lg:pl-6 lg:pt-0">
                <span className="font-semibold tracking-wider text-white underline underline-offset-2">
                  Features
                </span>
                <div className="flex flex-col space-y-3 p-1">
                  {[
                    "Chat",
                    "Stock",
                    "Drive",
                    "Calendar",
                    "Clone",
                    "OpenAI",
                  ].map((el) => (
                    <Link
                      className="w-32 rounded-md px-3  py-1 text-white transition duration-300
                      hover:bg-slate-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
                      key={el}
                      to={`/cloud?category=${el}`}
                    >
                      {el}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
