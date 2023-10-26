import { json } from "@remix-run/node";
import { Link, type MetaFunction } from "@remix-run/react";
import CloudCategoriesMenu from "~/components/CloudCategoriesMenu";
import Nav from "~/components/Nav";
import ProjectCardList from "~/components/ProjectCardList";
import useSearch from "~/hooks/useSearch";
import { getCloudConsolidatedData, getData } from "~/utils/helpers.server";

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
  const url = new URL(request.url);
  const search =
    new URL(url).searchParams.get("search")?.toString().toLowerCase() || "";
  const category =
    url.searchParams.get("category")?.toString().toLowerCase() || "";
  const data = await getData();
  let cloudData = getCloudConsolidatedData(data?.info.cloud || {});
  if (category)
    cloudData = cloudData.filter(
      (el) =>
        el.title.toLowerCase().includes(category) ||
        el.description.toLowerCase().includes(category) ||
        el.url.toLowerCase().includes(category),
    );
  if (search)
    cloudData = cloudData.filter(
      (el) =>
        el.title.toLowerCase().includes(search) ||
        el.description.toLowerCase().includes(search) ||
        el.url.toLowerCase().includes(search),
    );
  return json({ key: "cloud", data: cloudData });
}
export default function cloud() {
  const displayData = useSearch("cloud");
  return (
    <main className=" flex w-full  flex-col bg-slate-700">
      <Nav
        menu={
          <>
            <div className="flex flex-1 gap-3">
              <Link
                to="/cloud"
                prefetch="intent"
                className="rounded-md px-3  py-1 text-white transition duration-300
                                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
              >
                All
              </Link>
              <CloudCategoriesMenu></CloudCategoriesMenu>
            </div>
          </>
        }
      ></Nav>
      <div className="mt-1 min-h-screen w-full p-1 lg:px-4 lg:py-2">
        {displayData.length > 0 ? (
          <ProjectCardList data={displayData}></ProjectCardList>
        ) : (
          <p className="w-full animate-slide-up text-center text-gray-50">
            No results found... Please verify the search text
          </p>
        )}
      </div>
    </main>
  );
}
export function ErrorBoundary() {
  return (
    <main className="flex w-full flex-col  bg-slate-700">
      <Nav menu={<></>}></Nav>
      <div className="mt-1 min-h-screen w-full p-1 lg:px-4 lg:py-2">
        <p className="w-full text-center text-red-300">
          🥺 Error parsing data... Probably read limit exceeded. Please try
          refreshing again.
        </p>
      </div>
    </main>
  );
}
