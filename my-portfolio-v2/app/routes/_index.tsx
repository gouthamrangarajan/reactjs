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

import { type MetaFunction, useLoaderData, Link } from "@remix-run/react";
import Header from "~/components/Header";
import Nav from "~/components/Nav";
import Skills from "~/components/Skills";
import { getData } from "~/utils/helpers.server";
import { mediaAndSkillsDataSchema } from "~/utils/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "Goutham Rangarajan - Portfolio" },
    {
      name: "description",
      content: "Goutham Rangarajan Portfolio",
    },
  ];
};
const skillsToFilter = [
  "NuxtJs",
  "NextJs",
  "Firebase Functions",
  "Azure",
  "Azure Functions",
];
export async function loader() {
  const data = await getData();
  const media = data?.info.media;
  let skills = data?.info.skills;
  if (skills) {
    skills = skills.filter((el) => !skillsToFilter.includes(el.name));
  }
  return { media, skills };
}
export default function Index() {
  const loaderData = useLoaderData();
  const { media, skills } = mediaAndSkillsDataSchema.parse(loaderData);
  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <Header media={media}></Header>
        <div className="mt-4 w-full pb-16 lg:pb-4">
          <Skills data={skills}></Skills>
        </div>
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
