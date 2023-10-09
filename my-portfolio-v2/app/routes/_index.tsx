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

import { type MetaFunction, useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
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

export async function loader() {
  const data = await getData();
  return { media: data?.info.media, skills: data?.info.skills };
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
    </main>
  );
}
