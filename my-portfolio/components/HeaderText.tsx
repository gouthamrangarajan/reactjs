import { NextPage } from "next";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const HeaderText: NextPage<headerTextPropsType> =({classes,children})=>{
  let {color}=useContext(ThemeContext);
  return (
    <span className={` ${color=='DARK'?"bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-sky-400":"text-white"}
        ${classes}`}>
        {children}
    </span>
  )
}
type headerTextPropsType={
    classes?:string|undefined;
    children:React.ReactNode|React.ReactNode[]
}
export default HeaderText