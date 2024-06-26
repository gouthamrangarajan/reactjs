import { motion } from "framer-motion";
import type { NextPage } from "next";
import { mediaType } from "../models/dataType";
import {
  headerTextParent,
  staggerChild,
  staggerParent,
} from "../utils/animationVariants";
import HeaderText from "./HeaderText";

const Header: NextPage<headerPropType> = ({ media }) => {
  return (
    <header
      className={`flex py-4 px-6  w-screen items-center justify-center flex-col space-y-6 flex-shrink-0
      bg-gradient-to-r from-slate-900 to-slate-800`}
    >
      <div className="h-56 w-56 p-1 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500">
        <img
          src="/my-avatar.jpg"
          className="rounded-full object-contain"
          alt="My Avatar"
        ></img>
      </div>
      <motion.div
        className="flex flex-col items-center justify-center"
        variants={headerTextParent}
        initial="hidden"
        animate="show"
      >
        <HeaderText
          classes="font-semibold text-3xl h-12"
          text="Goutham Rangarajan"
        ></HeaderText>
        <HeaderText
          classes="italic font-semibold tracking-wider"
          text="RG"
        ></HeaderText>
        <HeaderText classes="text-lg" text="Front-end enthusiast"></HeaderText>
      </motion.div>
      <motion.div
        className="flex space-x-2 items-center"
        variants={staggerParent}
        initial="hidden"
        animate="show"
      >
        {media.map((med) => (
          <motion.a
            className="appearance-none outline-none h-14 w-14 p-1 rounded-full focus:ring-2 focus:ring-white"
            variants={staggerChild}
            target="_blank"
            href={med.url}
            key={med.name}
            rel="noreferrer"
          >
            <img
              src={med.imgSrc}
              className={`rounded-full object-contain ${
                med.name == "Twitter" ? "bg-white mt-0.5" : ""
              }`}
              alt={med.name}
              title={med.name}
            ></img>
          </motion.a>
        ))}
      </motion.div>
    </header>
  );
};
type headerPropType = {
  media: mediaType[];
};
export default Header;
