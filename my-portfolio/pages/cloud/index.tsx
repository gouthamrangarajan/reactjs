import React, { Suspense } from "react";
import { NextPage } from "next";
import Head from "next/head";
const SearchResults = React.lazy(() => import("../../components/CloudPage/SearchResults"));
const Nav = React.lazy(() => import("../../components/Nav"));
const CloudPageContextProvider = React.lazy(() => import("../../contexts/CloudPageContextProvider"));
import dataType, { cloudType, consolidatedDataType } from "../../models/dataType";
const NavSearch = React.lazy(() => import("../../components/CloudPage/NavSearch"));
import { createClient } from "redis";
import Loader from "../../components/Loader";

const Index: NextPage<cloudPropsType> = ({ data }) => {
    return (
        <>
            <Head>
                <title>Goutham Rangarajan - Cloud Projects</title>
                <meta
                    key="description"
                    content="Goutham Rangarajan Full Stack Cloud Projects"
                    property="description"
                ></meta>
                <link href="/favicon.ico" rel="icon" type="image/x-icon"></link>
                <link href="/manifest.json" rel="manifest"></link>
            </Head>
            <Suspense fallback={<Loader></Loader>}>
                <CloudPageContextProvider>
                    <div className="w-full bg-slate-700 flex flex-col">
                        <Nav menu={<NavSearch></NavSearch>}></Nav>
                        <SearchResults cloudData={data}></SearchResults>
                    </div>
                </CloudPageContextProvider>
            </Suspense>
        </>)
}
type cloudPropsType = {
    data: consolidatedDataType[];
};
export default Index
export async function getStaticProps() {
    let cloudConsolidatedData: consolidatedDataType[] = [];
    try {
        const redis_client = createClient({
            url: process.env.REDIS_URL,
            password: process.env.REDIS_PWD
        });
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        await redis_client.connect();
        let data = JSON.parse(await redis_client.get("portfolio_data") || "{}") as dataType;
        await redis_client.disconnect();
        cloudConsolidatedData = getConsolidatedData(data.info.cloud);
    }
    catch (err) {
        console.log('Redis Client Error', err)
    }
    if (cloudConsolidatedData.length == 0) {
        let data: dataType = await import("../../public/data.json");
        cloudConsolidatedData = getConsolidatedData(data.info.cloud);
    }
    return {
        props: {
            data: cloudConsolidatedData,
        },
        revalidate: 60
    };
}
function getConsolidatedData({ firebase, azure, netlify, cloudflare }: cloudType): consolidatedDataType[] {
    let consolidated: Array<consolidatedDataType> = [];
    firebase.forEach(el => {
        if (el.imgSrc)
            consolidated.push({ imgSrc: el.imgSrc, url: el.url || "", description: el.description || "", title: "FIREBASE" });
        if (el.other)
            el.other.forEach(inEl => {
                if (inEl.imgSrc)
                    consolidated.push({
                        imgSrc: inEl.imgSrc, url: inEl.url || "", description: inEl.description || "",
                        title: "FIREBASE"
                    })
            })
    });
    cloudflare.forEach(el => {
        if (el.imgSrc)
            consolidated.push({ imgSrc: el.imgSrc, url: el.url || "", description: el.description || "", title: "CLOUDFLARE" });
        if (el.other)
            el.other.forEach(inEl => {
                if (inEl.imgSrc)
                    consolidated.push({
                        imgSrc: inEl.imgSrc, url: inEl.url || "", description: inEl.description || "",
                        title: "NETLIFY"
                    })
            })
    });
    netlify.forEach(el => {
        if (el.imgSrc)
            consolidated.push({ imgSrc: el.imgSrc, url: el.url || "", description: el.description || "", title: "NETLIFY" });
        if (el.other)
            el.other.forEach(inEl => {
                if (inEl.imgSrc)
                    consolidated.push({
                        imgSrc: inEl.imgSrc, url: inEl.url || "", description: inEl.description || "",
                        title: "NETLIFY"
                    })
            })
    });
    azure.forEach(el => {
        if (el.imgSrc)
            consolidated.push({ imgSrc: el.imgSrc, url: el.url || "", description: el.description || "", title: "AZURE" });
        if (el.other)
            el.other.forEach(inEl => {
                if (inEl.imgSrc)
                    consolidated.push({
                        imgSrc: inEl.imgSrc, url: inEl.url || "", description: inEl.description || "",
                        title: "AZURE"
                    })
            })
    });
    return consolidated;
}