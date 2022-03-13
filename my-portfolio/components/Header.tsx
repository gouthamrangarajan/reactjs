import { MoonIcon } from "@heroicons/react/outline";
import { SunIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { ThemeContext, UpdateThemeContext } from "../contexts/ThemeContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { fade } from "../utils/animationVariants";
import HeaderText from "./HeaderText";

const Header: NextPage = () => {
  let {color}=useContext(ThemeContext);
  let dispatch=useContext(UpdateThemeContext);
  let {data,updateData}=useLocalStorage<string>("theme");
  useEffect(()=>{
    if(data && dispatch){
      if(data=="DARK") dispatch({action:"SET_DARK_COLOR_THEME"})
      if(data=="LIGHT") dispatch({action:"SET_LIGHT_COLOR_THEME"})
    }
  },[data,dispatch])
  let setDarkTheme=()=>{if(dispatch)dispatch({action:"SET_DARK_COLOR_THEME"}); updateData("DARK");}
  let setLightTheme=()=>{if(dispatch)dispatch({action:"SET_LIGHT_COLOR_THEME"}); updateData("LIGHT");}
  return (
    <header
      className={`h-48 flex justify-between w-full py-1 px-3 lg:py-2 lg:px-4 xl:py-4 xl:px-6 flex-shrink-0
                  ${color=="LIGHT"?"bg-gradient-to-b from-gray-900  to-gray-400":""}`}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <HeaderText classes="font-semibold text-2xl">Goutham Rangarajan</HeaderText>        
        <HeaderText classes="italic font-semibold">RG</HeaderText>
      </div>
      <div className="flex relative">
        <AnimatePresence exitBeforeEnter>
          {color=="LIGHT" ? (
            <motion.button className="absolute top-8 right-24 lg:right-32 appearance-none outline-none 
                  focus:ring-2 focus:ring-sky-400 p-1 rounded-lg transition duration-300" 
                variants={fade} initial="hidden" animate="visible" exit="hidden" onClick={setDarkTheme} key={1}>
              <MoonIcon className="cursor-pointer w-5 h-5 text-sky-400 hover:opacity-90 font-semibold">
              </MoonIcon>
            </motion.button>)
            :
            (<motion.button className="absolute top-8 right-24 lg:right-32 appearance-none outline-none
                 focus:ring-2 focus:ring-gray-100 p-1 rounded-lg transition duration-300"
               variants={fade} initial="hidden" animate="visible" exit="hidden" onClick={setLightTheme} key={2}>
              <SunIcon className="cursor-pointer w-5 h-5 text-gray-100 hover:opacity-90">
              </SunIcon>
            </motion.button>)
          }
        </AnimatePresence>
      <div className="h-[5.5rem] w-[5.5rem] cursor-pointer">
        <img
          src="/my-avatar.jpg"
          className="rounded-full object-contain"
          alt="My Avatar"
        ></img>
      </div>
      </div>
    </header>
  );
};

export default Header;
