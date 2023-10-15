import {
  useLoaderData,
  type MetaFunction,
  useFetchers,
} from "@remix-run/react";
import Nav from "~/components/Nav";
import ProjectCardList from "~/components/ProjectCardList";
import { getCloudConsolidatedData, getData } from "~/utils/helpers.server";
import { urlTitleImgSrcAndDescriptionArraySchema } from "~/utils/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "Goutham Rangarajan - Cloud Projects" },
    {
      name: "description",
      content: "List of full stack cloud projects",
    },
  ];
};

export async function loader({ request }: { request: Request }) {
  const search =
    new URL(request.url).searchParams.get("search")?.toString().toLowerCase() ||
    "";
  const data = await getData();
  let cloudData = getCloudConsolidatedData(data?.info.cloud || {});
  if (search)
    cloudData = cloudData.filter(
      (el) =>
        el.title.toLowerCase().includes(search) ||
        el.description.toLowerCase().includes(search) ||
        el.url.toLowerCase().includes(search),
    );
  return cloudData;
}
export default function cloud() {
  const loaderData = useLoaderData();
  const parsedLoaderData =
    urlTitleImgSrcAndDescriptionArraySchema.parse(loaderData);
  let dataToDisplay = parsedLoaderData;
  // const fetchers = useFetchers();
  // const searchFetcher = fetchers.filter(
  //   (el) =>
  //     el.formAction == "/cloud" &&
  //     el.formMethod == "GET" &&
  //     typeof el.formData?.get("search") != "undefined",
  // )[0];
  // if (searchFetcher) {
  //   console.log("enter 2", searchFetcher.data);
  //   if (typeof searchFetcher.data !== "undefined") {
  //     const parsedFetcherData = urlTitleImgSrcAndDescriptionArraySchema.parse(
  //       searchFetcher.data,
  //     );
  //     dataToDisplay = parsedFetcherData;
  //   }
  // }

  return (
    <div className="flex w-full flex-col  bg-slate-700">
      <Nav menu={<></>}></Nav>
      <div className="mt-1 min-h-screen w-full p-1 lg:px-4 lg:py-2">
        <ProjectCardList data={dataToDisplay}></ProjectCardList>
      </div>
    </div>
  );
}
