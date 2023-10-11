import { motion } from "framer-motion";
import { staggerChild, staggerParent } from "../utils/animationVariants";
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
      <div className="flex flex-col items-center justify-center">
        <HeaderText
          classes="font-semibold text-3xl h-12"
          text="Goutham Rangarajan"
        ></HeaderText>
        <HeaderText
          classes="italic font-semibold tracking-wider animate-[slide-down_0.6s_ease-in]"
          text="RG"
        ></HeaderText>
        <HeaderText
          classes="text-lg animate-[slide-down_0.9s_ease-in]"
          text="Front-end enthusiast"
        ></HeaderText>
      </div>
      <div className="flex items-center space-x-2">
        {media.map((med, ind) => (
          <a
            className={`h-14 w-14 appearance-none rounded-full p-1 outline-none hover:opacity-90
                        focus-visible:ring-2 focus-visible:ring-white ${getSlideUpAnimateClass(
                          ind,
                        )} 
                        `}
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
          </a>
        ))}
      </div>
    </header>
  );
}
function getSlideUpAnimateClass(ind: number) {
  switch (ind) {
    case 0:
      return ``;
    case 1:
      return `animate-[slide-up_0.6s_ease-in]`;
    case 2:
      return `animate-[slide-up_0.9s_ease-in]`;
    case 3:
      return `animate-[slide-up_1.2s_ease-in]`;
  }
}
