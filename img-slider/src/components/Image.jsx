const Image = ({ url, text, height = "100vh", width = "100vw" }) => {
  return (
    <div className="relative w-full">
      <img src={url} style={{ width: width, height: height }}></img>
      <div className="absolute top-0 left-0 mt-4 lg:mt-8 w-full flex items-center">
        <div
          className="py-2 px-4 lg:py-4 lg:px-6 w-11/12 lg:w-[28rem] mx-auto
           rounded-lg border border-white font-semibold bg-gray-300"
        >
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Image;
