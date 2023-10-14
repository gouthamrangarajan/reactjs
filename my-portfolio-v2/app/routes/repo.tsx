import { useLoaderData, type MetaFunction } from "@remix-run/react";
import Nav from "~/components/Nav";
import ProjectCardList from "~/components/ProjectCardList";
import { getData, getRepoConsolidatedData } from "~/utils/helpers.server";
import { urlTitleImgSrcAndDescriptionArraySchema } from "~/utils/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "Goutham Rangarajan - Github & Codepen" },
    {
      name: "description",
      content: "List of Github & Codepen shares",
    },
  ];
};

export async function loader() {
  const data = await getData();
  const repoData = getRepoConsolidatedData({
    codePen: data?.info.codePen || [],
    gitHub: data?.info.gitHub || [],
  });
  return repoData;
}

export default function repo() {
  const loaderData = useLoaderData();
  const parsedData = urlTitleImgSrcAndDescriptionArraySchema.parse(loaderData);
  return (
    <div className="flex w-full flex-col  bg-slate-700">
      <Nav menu={<></>}></Nav>
      <div className="mt-1 min-h-screen w-full p-1 lg:px-4 lg:py-2">
        <ProjectCardList data={parsedData}></ProjectCardList>
      </div>
    </div>
  );
}
