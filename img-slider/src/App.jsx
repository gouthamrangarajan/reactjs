import { useEffect, useState } from "react";
import "./App.css";
import ImageSlider from "./components/ImageSlider";

const App = () => {
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    setImgs([
      {
        id: 1,
        url: "http://www.nasa.gov/sites/default/files/thumbnails/image/potw1930a.jpg",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eligendi fugiat nam distinctio quidem ullam labore error voluptate? Est fugiat quos porro alias officia libero earum provident accusantium quibusdam ea?",
      },
      {
        id: 2,
        url: "https://e3.365dm.com/20/10/2048x1152/skynews-moon-earth-nasa_5143344.jpg",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio aliquid libero officiis reprehenderit consequatur est incidunt aliquam facilis! Natus eos earum obcaecati porro tenetur similique voluptate dolorem ad, possimus iste.",
      },
      {
        id: 3,
        url: "https://www.nasa.gov/sites/default/files/thumbnails/image/a-cold-brown-dwarf-v2.jpg",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi necessitatibus mollitia provident facilis perferendis, nemo nesciunt corrupti sunt, quibusdam in. Quod, doloremque. Praesentium, cumque dolorem magni qui perferendis eaque.",
      },
      {
        id: 4,
        url: "https://www.nasa.gov/sites/default/files/thumbnails/image/potw2109a.jpg",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum unde rerum dolores non quam, esse veniam nulla! Distinctio praesentium ratione aliquam, tempora perspiciatis exercitationem placeat neque, omnis, accusamus voluptatum atque!",
      },
      {
        id: 5,
        url: "https://www.nasa.gov/sites/default/files/thumbnails/image/sep_activeregionview_v01160_print.jpg",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nesciunt eligendi a rem et quibusdam ratione sunt omnis dignissimos illo ducimus, quis temporibus ipsum eos unde, minus quam fugiat itaque.",
      },
    ]);
  }, []);
  return (
    <div
      className="h-screen w-screen overflow-y-auto 
      scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100 scrollbar-thumb-rounded-md"
    >
      <div className="flex flex-col space-y-2 min-h-screen w-screen lg:mb-2">
        <ImageSlider imgs={imgs} width="100vw" height="100vh"></ImageSlider>
        {window.innerWidth >= 768 && (
          <>
            <div className="flex w-full items-center justify-center space-x-3 lg:space-x-6 xl:space-x-12">
              <span className="text-xl text-blue-600 font-semibold">
                Another Slider
              </span>
              <div className="shadow-2xl bg-white rounded-lg overflow-hidden">
                <ImageSlider
                  imgs={imgs}
                  width="50vw"
                  height="50vh"
                ></ImageSlider>
              </div>
            </div>
            <div className="flex w-full items-center justify-center space-x-3 lg:space-x-6 xl:space-x-12">
              <div className="shadow-2xl bg-white rounded-lg overflow-hidden">
                <ImageSlider
                  imgs={imgs}
                  width="50vw"
                  height="50vh"
                ></ImageSlider>
              </div>
              <span className="text-xl text-blue-600 font-semibold">
                One More
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
