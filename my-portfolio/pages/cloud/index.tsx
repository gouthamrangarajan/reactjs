import { NextPage } from "next";
import Head from "next/head";
import SearchResults from "../../components/CloudPage/SearchResults";
import Nav from "../../components/Nav";
import CloudPageContextProvider from "../../contexts/CloudPageContext";
import useConsolidatedData from "../../hooks/useConsolidatedData";
import dataType from "../../models/dataType";
import NavSearch from "../../components/CloudPage/NavSearch";


const Index: NextPage<cloudPropsType> = ({ data: { info: { cloud: { firebase, netlify, azure } } } }) => {
    let { data } = useConsolidatedData("CLOUD", firebase, netlify, azure, undefined, undefined);
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
            <CloudPageContextProvider>
                <div className="w-full bg-slate-700 flex flex-col">
                    <Nav menu={<NavSearch></NavSearch>}>
                    </Nav>
                    <SearchResults cloudData={data}></SearchResults>
                </div>
            </CloudPageContextProvider>
        </>)
}
type cloudPropsType = {
    data: dataType;
};
export default Index
export async function getStaticProps() {
    let data: dataType = await require("../../public/data.json");
    return {
        props: {
            data,
        },
    };
}
