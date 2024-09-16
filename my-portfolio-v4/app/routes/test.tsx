// export function headers({
//   loaderHeaders,
//   parentHeaders,
// }: {
//   loaderHeaders: Headers;
//   parentHeaders: Headers;
// }) {
//   console.log(
//     "This is an example of how to set caching headers for a route, feel free to change the value of 60 seconds or remove the header"
//   );
//   return {
//     // This is an example of how to set caching headers for a route
//     // For more info on headers in Remix, see: https://remix.run/docs/en/v1/route/headers
//     "Cache-Control": "public, max-age=60, s-maxage=60",
//   };
// }

import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { type MetaFunction, useLoaderData, Link } from "@remix-run/react";
import HeaderV2 from "~/components/HeaderV2";
import Nav from "~/components/Nav";
import { getData } from "~/utils/helpers.server";
import { skillsV2Schema } from "~/utils/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "Goutham Rangarajan - Portfolio" },
    {
      name: "description",
      content: "Goutham Rangarajan Portfolio",
    },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const data = await getData(context);
  const skillsV2 = data.info.skillsV2;
  return skillsV2;
}
export default function Index() {
  const loaderData = useLoaderData();
  const parsedLoaderData = skillsV2Schema.parse(loaderData);
  return (
    <main
      className="relative flex h-screen w-screen  animate-fade-in flex-col overflow-y-auto
    overflow-x-hidden font-sans scrollbar-thin scrollbar-track-gray-300  scrollbar-thumb-gray-500 "
    >
      <HeaderV2 data={parsedLoaderData}></HeaderV2>
      <Nav
        menu={
          <div className="flex flex-1 items-center space-x-3 text-white ">
            <span className="px-3 py-1 text-sm text-gray-100">
              Check out my Demos
            </span>
            <Link
              to="/cloud"
              prefetch="intent"
              className="rounded-md px-3  py-1 text-white transition duration-300
                                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
            >
              Cloud Projects
            </Link>
            <Link
              to="/repo"
              prefetch="intent"
              className="rounded-md px-3  py-1 text-white transition duration-300
                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
            >
              Github &amp; Codepen
            </Link>
          </div>
        }
      ></Nav>
    </main>
  );
}
export function ErrorBoundary() {
  return (
    <main
      className="relative flex h-screen w-screen  animate-fade-in flex-col overflow-y-auto
    overflow-x-hidden  font-sans scrollbar-thin scrollbar-track-gray-300  scrollbar-thumb-gray-500 "
    >
      <div className="flex min-h-screen flex-col">
        <p className="text-red-600">
          🥺 Error parsing data... Probably read limit exceeded. Please try
          refreshing again.
        </p>
      </div>
      <Nav
        menu={
          <div className="flex flex-1 items-center space-x-3 text-white ">
            <span className="px-3 py-1 text-sm text-gray-100">
              Check out my Demos
            </span>
            <Link
              to="/cloud"
              prefetch="intent"
              className="rounded-md px-3  py-1 text-white transition duration-300
                                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
            >
              Cloud Projects
            </Link>
            <Link
              to="/repo"
              prefetch="intent"
              className="rounded-md px-3  py-1 text-white transition duration-300
                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
            >
              Github &amp; Codepen
            </Link>
          </div>
        }
      ></Nav>
    </main>
  );
}
