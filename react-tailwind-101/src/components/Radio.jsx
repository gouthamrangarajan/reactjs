const Radio = ({ onChange, label, checked, name }) => {
  return (
    <div className="flex space-x-1 items-center cursor-pointer">
      <div className="relative" onClick={onChange}>
        <input
          type="radio"
          name={name}
          className="appearance-none outline-none w-5 h-5 cursor-pointer rounded-full
               border-2 border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></input>
        {checked && (
          <span className="absolute top-0 left-0 mt-1 ml-1 w-3 h-3 rounded-full bg-blue-500"></span>
        )}
      </div>
      <label onClick={onChange} className="-mt-2 cursor-pointer">
        {label}
      </label>
    </div>
  );
};
export default Radio;
