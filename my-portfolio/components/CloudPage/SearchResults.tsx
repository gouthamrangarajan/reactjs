import { NextPage } from "next"
import { useContext, useEffect, useState } from "react";
import { CloudPageContext } from "../../contexts/CloudPageContext";
import { consolidatedDataType } from "../../models/dataType"
import ProjectCardList from "../ProjectCardList"

const SearchResults: NextPage<searchResultsPropsType> = ({ cloudData }) => {
    let [cardListData, setCardListData] = useState<consolidatedDataType[]>(cloudData);
    let { applicationTypeFilter, cloudProviderFilter, textFilter } = useContext(CloudPageContext);
    useEffect(() => {
        setCardListData(cloudData);
        if (cloudProviderFilter != "")
            setCardListData(cloudData.filter(el => el.title.toLowerCase() == cloudProviderFilter.toLowerCase()));
        else if (applicationTypeFilter != "")
            setCardListData(cloudData.filter(el => el.description?.toLowerCase().includes(applicationTypeFilter.toLowerCase())));
        else if (textFilter != "")
            setCardListData(cloudData.filter(el => el.description?.toLowerCase().includes(textFilter.toLowerCase())
                || el.title.toLowerCase().includes(textFilter.toLowerCase())
                || el.url.toLowerCase().includes(textFilter.toLowerCase())
            ));
    }, [cloudData, cloudProviderFilter, applicationTypeFilter, textFilter, setCardListData])
    return (
        <div className="p-1 lg:py-2 lg:px-4 w-full mt-1 min-h-screen">
            <ProjectCardList data={cardListData}></ProjectCardList>
        </div>
    )
}
type searchResultsPropsType = {
    cloudData: consolidatedDataType[]
}
export default SearchResults