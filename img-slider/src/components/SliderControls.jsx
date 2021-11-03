import { PauseIcon, PlayIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";

const getProgressContainerWidth = (container) => {
  let dt = {};
  if (container.current) {
    let { width: containerWidth } = container.current.getBoundingClientRect();
    //'w-32 lg:w-48 xl:w-64'
    dt.width = "8rem";
    if (containerWidth >= 1024) dt.width = "12rem";
    if (containerWidth >= 1280) dt.width = "16rem";
  }
  return dt;
};

const getGoToBtnGrpMarginR = (container) => {
  let dt = {};
  if (container.current) {
    let { width: containerWidth } = container.current.getBoundingClientRect();
    // lg:mr-32 xl:mr-64
    dt.marginRight = "2rem";
    if (containerWidth >= 1024) dt.marginRight = "8rem";
    if (containerWidth >= 1280) dt.marginRight = "16rem";
  }
  return dt;
};
const SliderControls = ({
  length,
  goTo,
  active,
  play,
  pause,
  playing,
  timer = 3000,
}) => {
  const [progressWidth, setProgressWidth] = useState(0);
  const [sliderControlInterval, setSliderControlInterval] = useState(null);
  const container = useRef(null);
  useEffect(() => {
    setProgressWidth(0);
    if (sliderControlInterval) clearInterval(sliderControlInterval);
    if (playing) {
      let increment = 100 / (timer / 10);
      setSliderControlInterval(
        setInterval(() => {
          setProgressWidth((width) => (width >= 100 ? 0 : width + increment));
        }, 10)
      );
    }
    return () => {
      if (sliderControlInterval) clearInterval(sliderControlInterval);
    };
  }, [playing, timer, active]);
  return (
    <div
      className="absolute bottom-0 left-0 w-full mb-2 lg:mb-4 flex justify-between items-center py-1 px-3 lg:py-2 lg:px-4"
      ref={container}
    >
      <div
        className="overflow-hidden"
        style={getProgressContainerWidth(container)}
      >
        <div
          className="h-2.5 bg-gray-200 bg-opacity-50 opacity-50 rounded-lg"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <div
        className="flex-1 justify-center items-center cursor-pointer flex space-x-4"
        style={getGoToBtnGrpMarginR(container)}
      >
        {Array.from(Array(length).keys()).map((el) => (
          <button
            key={el}
            onClick={() => goTo(el)}
            className={`appearance-none outline-none bg-gray-100 hover:transform
                     hover:-translate-y-0.5 h-3 w-3 focus:ring-1 focus:ring-gray-200 focus:ring-offset-2
                      focus:ring-offset-white rounded-full transition duration-100 
                     ${active == el ? "bg-gray-500" : ""}`}
          ></button>
        ))}
      </div>

      <div className="flex space-x-4 text-white items-center">
        <button
          className={`appearance-none outline-none cursor-pointer hover:transform
                     hover:-translate-y-0.5 transition duration-100
                     focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500 rounded-full
                     ${playing ? "bg-white text-gray-700" : ""}`}
          onClick={() => play()}
        >
          <PlayIcon className="w-6 h-6"></PlayIcon>
        </button>
        <button
          className={`appearance-none outline-none cursor-pointer hover:transform
           hover:-translate-y-0.5 transition duration-100
           focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500 rounded-full
           ${!playing ? "bg-white text-gray-700" : ""}`}
          onClick={() => pause()}
        >
          <PauseIcon className="w-6 h-6"></PauseIcon>
        </button>
      </div>
    </div>
  );
};

export default SliderControls;
