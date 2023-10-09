import { motion } from "framer-motion";
import {
  headerTextParent,
  staggerChild,
  staggerParent,
} from "../utils/animationVariants";
import HeaderText from "./HeaderText";
import { type mediaArrayType } from "~/utils/schema";

export default function Header({ media }: { media: mediaArrayType }) {
  return (
    <header
      className={`flex w-screen flex-shrink-0  flex-col items-center justify-center space-y-6 bg-gradient-to-r from-slate-900
      to-slate-800 px-6 py-4`}
    >
      <div className="h-56 w-56 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 p-1">
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
        className="flex items-center space-x-2"
        variants={staggerParent}
        initial="hidden"
        animate="show"
      >
        {media.map((med) => (
          <motion.a
            className="h-14 w-14 appearance-none rounded-full p-1 outline-none focus:ring-2 focus:ring-white"
            variants={staggerChild}
            target="_blank"
            href={med.url}
            key={med.name}
            rel="noreferrer"
          >
            <img
              src={med.imgSrc}
              className={`rounded-full object-contain ${
                med.name == "Twitter" ? "mt-0.5 bg-white" : ""
              }`}
              alt={med.name}
              title={med.name}
            ></img>
          </motion.a>
        ))}
      </motion.div>
    </header>
  );
}
