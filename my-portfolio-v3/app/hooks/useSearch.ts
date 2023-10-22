import { useFetchers, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  urlTitleImgSrcAndDescriptionArraySchema,
  type urlTitleImgSrcAndDescriptionArrayType,
} from "~/utils/schema";

export default function useSearch() {
  const loaderData = useLoaderData();
  const parsedLoaderData =
    urlTitleImgSrcAndDescriptionArraySchema.parse(loaderData);
  const [displayData, setDisplayData] = useState(parsedLoaderData);
  const searchFetcher = useFetchers().filter(
    (el) =>
      el.data &&
      (el.data as Array<urlTitleImgSrcAndDescriptionArrayType>) != null,
  )[0]; //TO DO find a better way

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

  useEffect(() => {
    const parsedLoaderData =
      urlTitleImgSrcAndDescriptionArraySchema.parse(loaderData);
    setDisplayData(parsedLoaderData);
  }, [loaderData]);

  return displayData;
}
