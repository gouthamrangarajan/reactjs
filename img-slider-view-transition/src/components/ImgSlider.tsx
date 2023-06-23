import { useState } from "react";
import SliderControls from "./SliderControls";

export default function ImageSlider({
  imgs,
  width = "100%",
  height = "100%",
}: {
  imgs: Array<{ id: number; url: string; text: string }>;
  width?: string;
  height?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexImg = imgs[currentIndex];
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        key={currentIndexImg.id}
        src={currentIndexImg.url}
        alt={currentIndexImg.text}
        height={height}
        width={width}
        className="object-cover w-full h-full"
      />
      <div className="absolute top-10 w-full flex items-center justify-center slider-text">
        <p className="w-11/12 lg:w-[28rem] py-2 px-4 shadow rounded bg-white text-gray-600">
          {currentIndexImg.text}
        </p>
      </div>
      <SliderControls
        noOfItems={imgs.length}
        goToItem={(idx) => {
          if (idx !== currentIndex) {
            /*@ts-ignore*/
            document.startViewTransition(() => {
              setCurrentIndex(idx);
            });
          }
        }}
      ></SliderControls>
    </div>
  );
}
