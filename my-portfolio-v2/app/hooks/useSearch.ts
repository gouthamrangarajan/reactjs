import { useFetchers, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { urlTitleImgSrcAndDescriptionArraySchema } from "~/utils/schema";

export default function useSearch() {
  const loaderData = useLoaderData();
  const parsedLoaderData =
    urlTitleImgSrcAndDescriptionArraySchema.parse(loaderData);
  const [displayData, setDisplayData] = useState(parsedLoaderData);
  const searchFetcher = useFetchers()[0]; //TO DO find a better way

  useEffect(() => {
    if (
      searchFetcher &&
      typeof searchFetcher.data !== "undefined" &&
      searchFetcher.state == "idle"
    ) {
      const parsedFetcherData = urlTitleImgSrcAndDescriptionArraySchema.parse(
        searchFetcher.data,
      );
      setDisplayData(parsedFetcherData);
    }
  }, [searchFetcher?.data, searchFetcher?.state]);
  return displayData;
}
