import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import TitleAndSearch from "../components/TitleAndSearch";
import Loader from "../components/Loader";
import useApi from "../hooks/useApi";
import { motion } from "framer-motion";

const getFilteredPhotoData = (photoData, filterTxt) => {
  filterTxt = filterTxt.trim().toLowerCase();
  return photoData.filter((el) => {
    if (!filterTxt) return true;
    else return el.title.toLowerCase().includes(filterTxt);
  });
};

const PhotosGrid = () => {
  const [photoData, setPhotoData] = useState([]);
  const [filterTxt, setFilterTxt] = useState("");
  const { loading, data } = useApi(
    "https://jsonplaceholder.typicode.com/photos"
  );
  setTimeout(() => {}, 2000);
  useEffect(() => {
    if (data && data.slice) {
      setPhotoData(data.slice(0, 100));
    }
  }, [data]);

  return (
    <Layout>
      <TitleAndSearch
        title="Jsonplaceholder photos"
        srchAction={setFilterTxt}
      ></TitleAndSearch>
      {loading && <Loader></Loader>}
      <div className="grid gird-cols-1 lg:grid-cols-3 gap-4">
        {getFilteredPhotoData(photoData, filterTxt).map(
          ({ id, url, title }) => (
            <motion.div
              className="flex flex-col ml-0 lg:ml-8 cursor-pointer"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              key={id}
              layout
            >
              <img src={url} className="w-full h-48 rounded-t-lg shadow"></img>
              <div className="py-2 px-4 rounded-b-lg bg-white shadow">
                <span className="font-semibold font-xl text-red-700 uppercase">
                  {title}
                </span>
              </div>
            </motion.div>
          )
        )}
      </div>
    </Layout>
  );
};
export default PhotosGrid;
