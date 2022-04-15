import { NextPage } from "next"
import { useContext, useEffect, useState } from "react";
import { RepoPageContext } from "../../contexts/RepoPageContext";
import { consolidatedDataType } from "../../models/dataType"
import ProjectCardList from "../ProjectCardList"

const SearchResults: NextPage<searchResultsPropsType> = ({ cloudData }) => {
    let [cardListData, setCardListData] = useState<consolidatedDataType[]>([]);
    let { repoFilter, textFilter } = useContext(RepoPageContext);
    useEffect(() => {
        setCardListData(cloudData);
        if (repoFilter != "")
            setCardListData(cloudData.filter(el => el.title.toLowerCase() == repoFilter.toLowerCase()));
        else if (textFilter != "")
            setCardListData(cloudData.filter(el => el.description?.toLowerCase().includes(textFilter.toLowerCase())
                || el.title.toLowerCase().includes(textFilter.toLowerCase())
                || el.url.toLowerCase().includes(textFilter.toLowerCase())
            ));
    }, [cloudData, repoFilter, textFilter, setCardListData])
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