import { NextPage } from "next";
import Head from "next/head";
import Nav from "../../components/Nav";
import useConsolidatedData from "../../hooks/useConsolidatedData";
import dataType, { githubItemType } from "../../models/dataType";
import { useEffect, useState } from "react";
import RepoPageContextProvider from "../../contexts/RepoPageContext";
import SearchResults from "../../components/RepoPage/SearchResults";
import NavSearch from "../../components/RepoPage/NavSearch";
import { createClient } from "redis";


const Index: NextPage<repoPropsType> = ({ data: { info: { gitHub, codePen } } }) => {
    let [githubItems, setGithubItems] = useState<githubItemType[]>([]);
    useEffect(() => {
        let itemType: githubItemType[] = [];
        if (gitHub)
            gitHub.forEach(el => {
                el.items?.forEach(inEl => {
                    itemType.push(inEl);
                });
            });
        setGithubItems(itemType);
    }, [gitHub, setGithubItems])
    let { data } = useConsolidatedData("GITHUB_CODEPEN", undefined, undefined, undefined, githubItems, codePen);
    return (
        <>
            <Head>
                <title>Goutham Rangarajan -Github & Codepen</title>
                <meta
                    key="description"
                    content="Goutham Rangarajan Github & Codepen code shares"
                    property="description"
                ></meta>
                <link href="/favicon.ico" rel="icon" type="image/x-icon"></link>
                <link href="/manifest.json" rel="manifest"></link>
            </Head>
            <RepoPageContextProvider>
                <div className="w-full bg-slate-700 flex flex-col">
                    <Nav menu={<NavSearch></NavSearch>}>
                    </Nav>
                    <SearchResults cloudData={data}></SearchResults>
                </div>
            </RepoPageContextProvider>
        </>)
}
type repoPropsType = {
    data: dataType;
};
export default Index
export async function getStaticProps() {
    const redis_client = createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PWD
    });
    redis_client.on('error', (err) => console.log('Redis Client Error', err));
    await redis_client.connect();
    let data = JSON.parse(await redis_client.get("portfolio_data") || "{}");
    await redis_client.disconnect();
    //let data: dataType = await require("./../public/data.json");
    return {
        props: {
            data,
        },
    };
}
