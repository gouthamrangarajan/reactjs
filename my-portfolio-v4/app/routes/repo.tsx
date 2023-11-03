import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { Link, type MetaFunction } from "@remix-run/react";
import Nav from "~/components/Nav";
import ProjectCardList from "~/components/ProjectCardList";
import useSearch from "~/hooks/useSearch";
import { getData, getRepoConsolidatedData } from "~/utils/helpers.server";
import { type urlTitleImgSrcAndDescriptionArrayType } from "~/utils/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "Goutham Rangarajan - Github & Codepen" },
    {
      name: "description",
      content: "List of Github & Codepen shares",
    },
  ];
};

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.toString().toLowerCase() || "";
  const category =
    url.searchParams.get("category")?.toString().toLowerCase() || "";
  const data = await getData(context);
  let repoData: urlTitleImgSrcAndDescriptionArrayType = [];
  switch (category) {
    case "github": {
      repoData = getRepoConsolidatedData({
        codePen: [],
        gitHub: data?.info.gitHub || [],
      });
      break;
    }
    case "codepen": {
      repoData = getRepoConsolidatedData({
        codePen: data?.info.codePen || [],
        gitHub: [],
      });
      break;
    }
    default: {
      repoData = getRepoConsolidatedData({
        codePen: data?.info.codePen || [],
        gitHub: data?.info.gitHub || [],
      });
      break;
    }
  }

  if (search)
    repoData = repoData.filter(
      (el) =>
        el.title.toLowerCase().includes(search) ||
        el.description.toLowerCase().includes(search) ||
        el.url.toLowerCase().includes(search),
    );
  return json({ key: "repo", data: repoData });
}

export default function repo() {
  const displayData = useSearch("repo");
  return (
    <main className="flex w-full animate-fade-in  flex-col bg-slate-700">
      <Nav
        menu={
          <>
            <div className="flex flex-1 gap-3">
              <Link
                to="/repo"
                prefetch="intent"
                className="rounded-md px-3  py-1 text-white transition duration-300
                                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
              >
                All
              </Link>
              <Link
                to="/repo?category=github"
                prefetch="intent"
                className="rounded-md px-3  py-1 text-white transition duration-300
                                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
              >
                Github
              </Link>
              <Link
                to="/repo?category=codepen"
                prefetch="intent"
                className="rounded-md px-3  py-1 text-white transition duration-300
                hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700"
              >
                Codepen
              </Link>
            </div>
          </>
        }
      ></Nav>
      <div className="mt-1 min-h-screen w-full p-1 lg:px-4 lg:py-2 xl:pb-2">
        {displayData.length > 0 ? (
          <ProjectCardList data={displayData}></ProjectCardList>
        ) : (
          <p className="w-full animate-fade-in text-center text-gray-50">
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
