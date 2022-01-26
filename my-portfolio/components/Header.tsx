import type { NextPage } from "next";

const Header: NextPage = () => {
  return (
    <header
      className="h-48 flex justify-between bg-gradient-to-b from-gray-900  to-gray-400 text-white w-full
            py-1 px-3 lg:py-2 lg:px-4 xl:py-4 xl:px-6 flex-shrink-0"
    >
      <div className="flex flex-col items-center justify-center w-full">
        <span className="font-semibold text-2xl">Goutham Rangarajan</span>
        <span className="italic font-semibold">RG</span>
      </div>
      <div className="h-24 w-24 cursor-pointer">
        <img
          src="/my-avatar.jpg"
          className="rounded-full object-contain"
          alt="My Avatar"
        ></img>
      </div>
    </header>
  );
};

export default Header;
