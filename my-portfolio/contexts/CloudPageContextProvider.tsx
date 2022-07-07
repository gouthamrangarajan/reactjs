import { NextPage } from "next";
import { createContext, Dispatch, useReducer } from "react";
import { cloudPageContextType, reducerActionType } from "../models/dataType";
import cloudPageReducer from "../reducers/cloudPageReducer";


export const CloudPageContext = createContext<cloudPageContextType>({ cloudProviderFilter: "", applicationTypeFilter: "", textFilter: "" });
export const CloudPageActionContext = createContext<Dispatch<reducerActionType<string>> | null>(null);

const CloudPageContextProvider: NextPage<cloudPageContextProviderPropsType> = ({ children }) => {
    let [state, dispatch] = useReducer(cloudPageReducer, { applicationTypeFilter: "", cloudProviderFilter: "", textFilter: "" });
    return (<CloudPageContext.Provider value={state}>
        <CloudPageActionContext.Provider value={dispatch}>
            {children}
        </CloudPageActionContext.Provider>
    </CloudPageContext.Provider>)
}
type cloudPageContextProviderPropsType = {
    children: React.ReactNode | React.ReactNode[]
}
export default CloudPageContextProvider;