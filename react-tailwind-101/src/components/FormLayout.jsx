const FormLayout = ({ children, submitHandler, title }) => {
  return (
    <form
      className="border-2 border-gray-300 focus-within:border-indigo-300 py-4 px-6
   rounded-lg w-full flex flex-col space-y-3 transition-all duration-300 ease-in"
      onSubmit={submitHandler}
    >
      <span className="text-gray-700 font-semibold">{title}</span>
      {children}
    </form>
  );
};

export default FormLayout;
