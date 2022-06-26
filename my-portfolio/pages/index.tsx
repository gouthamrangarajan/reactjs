import React, { Suspense } from "react";
import type { NextPage } from "next";
import Head from "next/head";
const Header = React.lazy(() => import("../components/Header"));
import dataType, { skillType, mediaType } from "../models/dataType";
const Skills = React.lazy(() => import("../components/Skills"));
const Nav = React.lazy(() => import("../components/Nav"));
import Link from "next/link";
import { createClient } from "redis";
import Loader from "../components/Loader";


const Home: NextPage<homePropsType> = ({ data: { media, skills } }) => {
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
      <Suspense fallback={<Loader></Loader>}>
        <div className="flex flex-col min-h-screen">
          <Header media={media}></Header>
          <div className="mt-4 w-full pb-16 lg:pb-4">
            <Skills data={skills}></Skills>
          </div>
        </div>
        <Nav menu={<div className="flex-1 text-white flex space-x-3 items-center ">
          <span className="text-gray-100 text-sm py-1 px-3">Check out my Demos</span>
          <Link href="/cloud">
            <a className="transition duration-300  text-white py-1 px-3 rounded-md
                                hover:ring-2 hover:ring-white
                                focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
              Cloud Projects
            </a>
          </Link>
          <Link href="/repo">
            <a className="transition duration-300  text-white py-1 px-3 rounded-md
                                hover:ring-2 hover:ring-white
                                focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
              Github &amp; Codepen
            </a>
          </Link>
        </div>}></Nav>
      </Suspense>
    </>
  );
};
export async function getStaticProps() {
  const redis_client = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PWD
  });
  redis_client.on('error', (err) => console.log('Redis Client Error', err));
  await redis_client.connect();
  let { info: { media, skills } } = JSON.parse(await redis_client.get("portfolio_data") || "{}") as dataType;
  //let data: dataType = await require("./../public/data.json");
  await redis_client.disconnect();

  return {
    props: {
      data: {
        media,
        skills
      },
    },
  };
}
type homePropsType = {
  data: {
    media: mediaType[];
    skills: skillType[];
  }
};
export default Home;
