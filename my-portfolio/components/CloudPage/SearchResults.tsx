import { NextPage } from "next"
import React from "react";
import { useContext, useEffect } from "react";
import { CloudPageContext } from "../../contexts/CloudPageContextProvider";
import { consolidatedDataType } from "../../models/dataType"
import { AppContext } from "../../pages/_app";
import ProjectCardList from "../ProjectCardList"

const SearchResults: NextPage<searchResultsPropsType> = ({ cloudData }) => {
    let { applicationTypeFilter, cloudProviderFilter, textFilter } = useContext(CloudPageContext);
    let { scrollEl } = useContext(AppContext);

    useEffect(() => {
        if (scrollEl && scrollEl.current)
            scrollEl.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [cloudData, cloudProviderFilter, applicationTypeFilter, textFilter, scrollEl]);

    return (
        <>
            <div className="p-1 lg:py-2 lg:px-4 w-full mt-1 min-h-screen">
                <ProjectCardList data={getCardListData(cloudData, cloudProviderFilter, applicationTypeFilter, textFilter)}></ProjectCardList>
            </div>
        </>
    )
}
type searchResultsPropsType = {
    cloudData: consolidatedDataType[]
}
export default SearchResults

function getCardListData(cloudData: consolidatedDataType[], cloudProviderFilter: string,
    applicationTypeFilter: string, textFilter: string) {
    let dt: consolidatedDataType[] = cloudData;
    if (cloudProviderFilter != "")
        dt = (cloudData.filter(el => el.title.toLowerCase() == cloudProviderFilter.toLowerCase()));
    else if (applicationTypeFilter != "")
        dt = (cloudData.filter(el => el.description?.toLowerCase().includes(applicationTypeFilter.toLowerCase())));
    else if (textFilter != "")
        dt = (cloudData.filter(el => el.description?.toLowerCase().includes(textFilter.toLowerCase())
            || el.title.toLowerCase().includes(textFilter.toLowerCase())
            || el.url.toLowerCase().includes(textFilter.toLowerCase())
        ));
    return dt;
}