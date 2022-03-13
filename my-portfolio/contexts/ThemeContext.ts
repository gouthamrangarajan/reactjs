import { createContext, Dispatch } from "react";
type themeContextType={
    color:'DARK'|'LIGHT';
}
export const DEFAULT_THEME_CONTEXT:themeContextType={
    color:'DARK'
}
export const ThemeContext=createContext<themeContextType>(DEFAULT_THEME_CONTEXT)
type updateThemeContextType={
    action:string;
    payload?:string;
}
export const UpdateThemeContext=createContext<Dispatch<updateThemeContextType>|null>(null);
export function ThemeReducer(context:themeContextType,data:updateThemeContextType):themeContextType{
    let newContext={...context}
    let {action}=data;
    switch(action){
        case 'SET_DARK_COLOR_THEME':{
            newContext.color='DARK';
            break;
        }
        case 'SET_LIGHT_COLOR_THEME':{
            newContext.color='LIGHT';
            break;
        }
    }
    return newContext;
}