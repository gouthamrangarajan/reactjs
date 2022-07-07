import { useContext } from 'react'
import { RepoPageActionContext, RepoPageContext } from '../../contexts/RepoPageContextProvider'
import SearchTxt from '../SearchTxt';


const NavSearch = () => {
    let dispatch = useContext(RepoPageActionContext);
    let { textFilter } = useContext(RepoPageContext);
    return (<>
        <div className="flex-1 text-white flex space-x-3 relative">
            <button className="appearance-none oultline-none py-1 px-3 rounded-md transition duration-300
                    hover:ring-2 hover:ring-white
                    focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700"
                onClick={() => {
                    if (dispatch)
                        dispatch({ name: "RESET_ALL" });
                }}>
                All
            </button>
            <button className="appearance-none oultline-none py-1 px-3 rounded-md transition duration-300
                    hover:ring-2 hover:ring-white
                    focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700"
                onClick={() => {
                    if (dispatch)
                        dispatch({ name: "SET_REPO_FILTER", payload: "GITHUB" });
                }}>
                Github
            </button>
            <button className="appearance-none oultline-none py-1 px-3 rounded-md transition duration-300
                    hover:ring-2 hover:ring-white
                    focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700"
                onClick={() => {
                    if (dispatch)
                        dispatch({ name: "SET_REPO_FILTER", payload: "CODEPEN" });
                }}>
                Codepen
            </button>
        </div>
        <div className="hidden md:inline-flex">
            <SearchTxt value={textFilter} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                if (dispatch)
                    dispatch({ name: "SET_TEXT_FILTER", payload: ev.target.value })
            }}></SearchTxt>
        </div>
    </>
    )
}

export default NavSearch