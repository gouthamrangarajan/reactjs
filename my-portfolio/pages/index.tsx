import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import dataType, { cloudArrayType, cloudType } from "../models/dataType";
import About from "../components/About";
import SecondRowLayout from "../components/SecondRowLayout";
import Media from "../components/Media";
import Repos from "../components/Repos";
import DownloadResume from "../components/DownloadResume";
import ScrollRowLayout from "../components/ScrollRowLayout";
import ProjectCardList from "../components/ProjectCardList";
import {
  getGitHubProjects,
  getProjects,
  getProjectsLength,
} from "../utils/helpers";

const Home: NextPage<homePropType> = ({ data: { info } }) => {
  return (
    <>
      <Head>
        <title>Goutham Rangarajan - Portfolio</title>
        <meta
          key="description"
          content="Goutham Rangarajan Portfolio"
          property="description"
        ></meta>
        <link href="/favicon.ico" rel="icon" type="image/x-icon"></link>
        <link href="/manifest.json" rel="manifest"></link>
      </Head>
      <div
        className="h-screen w-screen bg-gray-100 overflow-x-hidden overflow-y-auto flex flex-col 
         font-sans pb-4 scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300
          scrollbar-thumb-rounded-md"
      >
        <Header></Header>
        <About about={info.about}></About>
        <SecondRowLayout>
          <Media allMedia={info.media}></Media>
          <Repos allRepos={info.gitHub}></Repos>
          <DownloadResume></DownloadResume>
        </SecondRowLayout>
        <ScrollRowLayout title="Cloud Projects" centered></ScrollRowLayout>
        <div className="-mt-6"></div>
        {Object.keys(info.cloud)
          .sort((a, b) => (a > b ? -1 : 1))
          .map((el) => (
            <ScrollRowLayout
              title={el.toUpperCase()}
              key={el}
              centered={getProjectsLength(info.cloud, el) <= 3}
            >
              <ProjectCardList
                info={getProjects(info.cloud, el)}
                type="CLOUD"
              ></ProjectCardList>
            </ScrollRowLayout>
          ))}
        <ScrollRowLayout
          title="GITHUB"
          subtitle="Recent collection in React.js, Vue.js & Asp .Net"
        >
          <ProjectCardList
            info={getGitHubProjects(info.gitHub)}
            type="GITHUB"
          ></ProjectCardList>
        </ScrollRowLayout>
        <ScrollRowLayout
          title="CODEPEN"
          subtitle="Recent collection in HTML, CSS, Tailwind CSS & Vue.js"
        >
          <ProjectCardList info={info.codePen} type="CODEPEN"></ProjectCardList>
        </ScrollRowLayout>
      </div>
    </>
  );
};
export async function getStaticProps() {
  let data: dataType = await require("./../public/data.json");
  return {
    props: {
      data,
    },
  };
}
type homePropType = {
  data: dataType;
};
export default Home;
