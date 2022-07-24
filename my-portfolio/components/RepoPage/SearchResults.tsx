import { NextPage } from "next"
import React from "react";
import { useContext, useEffect } from "react";
import { RepoPageContext } from "../../contexts/RepoPageContextProvider";
import { consolidatedDataType } from "../../models/dataType"
import { AppContext } from "../../pages/_app";
import ProjectCardList from "../ProjectCardList"

const SearchResults: NextPage<searchResultsPropsType> = ({ cloudData }) => {
    let { repoFilter, textFilter } = useContext(RepoPageContext);
    let { scrollEl } = useContext(AppContext);

    useEffect(() => {
        if (scrollEl && scrollEl.current)
            scrollEl.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [cloudData, repoFilter, textFilter, scrollEl]);

    return (<>
        <div className="p-1 lg:py-2 lg:px-4 w-full mt-1 min-h-screen">
            <ProjectCardList data={getCardListData(cloudData, repoFilter, textFilter)}></ProjectCardList>
        </div>
    </>
    )
}
type searchResultsPropsType = {
    cloudData: consolidatedDataType[]
}
export default SearchResults

function getCardListData(cloudData: consolidatedDataType[], repoFilter: string,
    textFilter: string) {
    let dt: consolidatedDataType[] = cloudData;
    if (repoFilter != "")
        dt = (cloudData.filter(el => el.title.toLowerCase() == repoFilter.toLowerCase()));
    else if (textFilter != "")
        dt = (cloudData.filter(el => el.description?.toLowerCase().includes(textFilter.toLowerCase())
            || el.title.toLowerCase().includes(textFilter.toLowerCase())
            || el.url.toLowerCase().includes(textFilter.toLowerCase())
        ));
    return dt;
}