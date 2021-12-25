import { useEffect, useState } from "react";
import Image from "./Image";
import SliderControls from "./SliderControls";
const TIMER = 5000;

const ImageSlider = ({ imgs, width = "100vw", height = "100vh" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const stop = () => {
    if (isPlaying) setPlaying(false);
  };
  const start = () => {
    if (!isPlaying) setPlaying(true);
  };
  const goToIndex = (ind) => {
    setCurrentIndex(ind);
  };
  useEffect(() => {
    let timeout = null;
    if (isPlaying && imgs.length > 0) {
      timeout = setTimeout(() => {
        setCurrentIndex((currentIndex) => (currentIndex + 1) % imgs.length);
      }, TIMER);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [imgs, currentIndex, isPlaying]);
  useEffect(() => {
    start();
  }, []);
  return (
    <div
      className={`overflow-hidden relative`}
      style={{ width: width, height: height }}
    >
      <div
        className="flex absolute top-0 left-0 transition-transform duration-1000"
        style={{
          transform: `translateX(-${getTranslateX(currentIndex, width)})`,
        }}
      >
        {imgs.map((el) => (
          <div style={{ width: width, height: height }} key={el.id}>
            <Image key={el.id} {...el} height={height} width={width}></Image>
          </div>
        ))}
      </div>
      <SliderControls
        length={imgs.length}
        goTo={goToIndex}
        active={currentIndex}
        pause={stop}
        play={start}
        playing={isPlaying}
        timer={TIMER}
      ></SliderControls>
    </div>
  );
};
const getTranslateX = (currentIndex, width) => {
  if (width.toLowerCase().endsWith("rem"))
    return (
      parseFloat(width.toLowerCase().replace(/rem/, "")) * currentIndex + "rem"
    );
  else if (width.toLowerCase().endsWith("em"))
    return (
      parseFloat(width.toLowerCase().replace(/rem/, "")) * currentIndex + "em"
    );
  else if (width.toLowerCase().endsWith("vw"))
    return (
      parseFloat(width.toLowerCase().replace(/rem/, "")) * currentIndex + "vw"
    );
  else if (width.toLowerCase().endsWith("px"))
    return (
      parseFloat(width.toLowerCase().replace(/rem/, "")) * currentIndex + "px"
    );
  else return 0;
};
export default ImageSlider;
