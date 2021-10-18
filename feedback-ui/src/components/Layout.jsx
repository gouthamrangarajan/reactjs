const Layout = ({ children }) => {
  return (
    <div
      className="text-white text-lg h-screen min-w-screen flex flex-col space-y-4
                        items-center bg-purple-700 pt-2 lg:pt-6 xl:pt-12 pb-2 overflow-y-hidden
                   "
    >
      <span className="italic text-xs lg:text-sm">
        Inspiration from UI Design Daily
      </span>
      {children}
    </div>
  );
};

export default Layout;
