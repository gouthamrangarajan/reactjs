import React, { Suspense } from "react";
import { NextPage } from "next";
import Head from "next/head";
const Nav = React.lazy(() => import("../../components/Nav"));
import dataType, { consolidatedDataType } from "../../models/dataType";
const RepoPageContextProvider = React.lazy(() => import("../../contexts/RepoPageContext"));
const SearchResults = React.lazy(() => import("../../components/RepoPage/SearchResults"));
const NavSearch = React.lazy(() => import("../../components/RepoPage/NavSearch"));
import { createClient } from "redis";
import Loader from "../../components/Loader";


const Index: NextPage<repoPropsType> = ({ data }) => {
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
            <Suspense fallback={<Loader></Loader>}>
                <RepoPageContextProvider>
                    <div className="w-full bg-slate-700 flex flex-col">
                        <Nav menu={<NavSearch></NavSearch>}></Nav>
                        <SearchResults cloudData={data}></SearchResults>
                    </div>
                </RepoPageContextProvider>
            </Suspense>
        </>)
}
type repoPropsType = {
    data: consolidatedDataType[];
};
export default Index
export async function getStaticProps() {
    const redis_client = createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PWD
    });
    redis_client.on('error', (err) => console.log('Redis Client Error', err));
    await redis_client.connect();
    let data = JSON.parse(await redis_client.get("portfolio_data") || "{}") as dataType;
    //let data: dataType = await require("./../public/data.json");
    await redis_client.disconnect();
    let consolidatedData = getConsolidatedData(data);

    return {
        props: {
            data: consolidatedData
        },
    };
}
function getConsolidatedData({ info: { gitHub, codePen } }: dataType): consolidatedDataType[] {
    let consolidated: Array<consolidatedDataType> = [];
    gitHub.forEach(el => {
        el.items?.forEach(item => {
            if (item.imgSrc)
                consolidated.push({ imgSrc: item.imgSrc, url: item.url || "", description: item.description, title: "GITHUB" });
        });
    });
    codePen.forEach(el => {
        if (el.imgSrc)
            consolidated.push({ imgSrc: el.imgSrc, url: el.url || "", description: "", title: "CODEPEN" });
    });
    return consolidated;
}