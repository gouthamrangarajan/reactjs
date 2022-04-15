import { NextPage } from "next";
import { createContext, Dispatch, useReducer } from "react";
import { repoPageContextType, reducerActionType } from "../models/dataType";
import repoPageReducer from "../reducers/repoPageReducer";


export const RepoPageContext = createContext<repoPageContextType>({ repoFilter: "", textFilter: "" });
export const RepoPageActionContext = createContext<Dispatch<reducerActionType<string>> | null>(null);

const RepoPageContextProvider: NextPage<repoPageContextProviderPropsType> = ({ children }) => {
    let [state, dispatch] = useReducer(repoPageReducer, { repoFilter: "", textFilter: "" });
    return (<RepoPageContext.Provider value={state}>
        <RepoPageActionContext.Provider value={dispatch}>
            {children}
        </RepoPageActionContext.Provider>
    </RepoPageContext.Provider>)
}
type repoPageContextProviderPropsType = {
    children: React.ReactNode | React.ReactNode[]
}
export default RepoPageContextProvider;