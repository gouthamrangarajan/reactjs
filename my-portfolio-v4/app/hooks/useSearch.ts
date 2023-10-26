import { useFetchers, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { searchSchema } from "~/utils/schema";

export default function useSearch(key: string) {
  const loaderData = useLoaderData();
  const parsedLoaderData = searchSchema.parse(loaderData);
  const [displayData, setDisplayData] = useState(parsedLoaderData.data);
  const searchFetcher = useFetchers().filter(
    (el) => el.data && el.data.key && el.data.key == key,
  )[0];

  useEffect(() => {
    if (
      searchFetcher &&
      typeof searchFetcher.data !== "undefined" &&
      searchFetcher.state == "idle"
    ) {
      const parsedFetcherData = searchSchema.parse(searchFetcher.data);
      setDisplayData(parsedFetcherData.data);
    }
  }, [searchFetcher?.data, searchFetcher?.state]);

  useEffect(() => {
    const parsedLoaderData = searchSchema.parse(loaderData);
    setDisplayData(parsedLoaderData.data);
  }, [loaderData]);

  return displayData;
}
