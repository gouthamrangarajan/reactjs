const Nav = () => {
  return (
    <nav className="bg-white py-2 px-4 border-b border-gray-300 sticky top-0 z-10">
      <div className="flex justify-between max-w-7xl mx-auto">
        <span className="text-xl font-semibold text-blue-700">React js</span>
        <span className="text-xl font-semibold text-green-700">Vite</span>
        <span className="text-xl font-semibold text-indigo-700">
          Tailwind CSS
        </span>
      </div>
    </nav>
  );
};

export default Nav;
