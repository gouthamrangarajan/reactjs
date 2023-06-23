import ImgSlider from "./components/ImgSlider";

function App() {
  const imgs = [
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
      url: "https://www.nasa.gov/sites/default/files/thumbnails/image/sep_activeregionview_v01160_print.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nesciunt eligendi a rem et quibusdam ratione sunt omnis dignissimos illo ducimus, quis temporibus ipsum eos unde, minus quam fugiat itaque.",
    },
    {
      id: 5,
      url: "https://www.nasa.gov/sites/default/files/thumbnails/image/potw2109a.jpg",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum unde rerum dolores non quam, esse veniam nulla! Distinctio praesentium ratione aliquam, tempora perspiciatis exercitationem placeat neque, omnis, accusamus voluptatum atque!",
    },
  ];

  return (
    <div className="w-full h-full">
      <ImgSlider imgs={imgs} />
    </div>
  );
}

export default App;
