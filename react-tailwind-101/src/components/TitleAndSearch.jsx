import useDebouncedAction from "../hooks/useDebouncedAction";
const TitleAndSearch = ({ title, srchAction }) => {
  const action = useDebouncedAction(srchAction);
  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <span className="text-lg text-green-700 font-semibold">{title}</span>
      <input
        type="text"
        className="appearance-none outline-none border-2 rounded-lg py-1 px-3 border-blue-500 focus:border-transparent 
                        focus:ring-2 focus:ring-blue-500 transition-all ease-in duration-300 w-full lg:w-64"
        placeholder="Search..."
        onInput={({ target }) => action(target.value)}
      ></input>
    </div>
  );
};
export default TitleAndSearch;
