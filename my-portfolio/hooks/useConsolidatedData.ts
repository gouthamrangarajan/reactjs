import { useEffect, useState } from "react";
import { cloudArrayType, codePenType, consolidatedDataType, githubItemType } from "../models/dataType";

export default function useConsolidatedData(type: "CLOUD" | "GITHUB" | "CODEPEN" | "GITHUB_CODEPEN",
    firebase: cloudArrayType[] | undefined, netlify: cloudArrayType[] | undefined, azure: cloudArrayType[] | undefined,
    github: githubItemType[] | undefined, codepen: codePenType[] | undefined) {
    let [data, setData] = useState<Array<consolidatedDataType>>([]);
    useEffect(() => {
        let newConsolidated: Array<consolidatedDataType> = [];
        switch (type) {
            case "CLOUD": {
                if (firebase)
                    firebase.forEach(el => {
                        if (el.imgSrc)
                            newConsolidated.push({ imgSrc: el.imgSrc, url: el.url || "", description: el.description, title: "FIREBASE" });
                        if (el.other)
                            el.other.forEach(inEl => {
                                if (inEl.imgSrc)
                                    newConsolidated.push({
                                        imgSrc: inEl.imgSrc, url: inEl.url || "", description: inEl.description,
                                        title: "FIREBASE"
                                    })
                            })
                    });
                if (netlify)
                    netlify.forEach(el => {
                        if (el.imgSrc)
                            newConsolidated.push({ imgSrc: el.imgSrc, url: el.url || "", description: el.description, title: "NETLIFY" });
                        if (el.other)
                            el.other.forEach(inEl => {
                                if (inEl.imgSrc)
                                    newConsolidated.push({
                                        imgSrc: inEl.imgSrc, url: inEl.url || "", description: inEl.description,
                                        title: "NETLIFY"
                                    })
                            })
                    });
                if (azure)
                    azure.forEach(el => {
                        if (el.imgSrc)
                            newConsolidated.push({ imgSrc: el.imgSrc, url: el.url || "", description: el.description, title: "AZURE" });
                        if (el.other)
                            el.other.forEach(inEl => {
                                if (inEl.imgSrc)
                                    newConsolidated.push({
                                        imgSrc: inEl.imgSrc, url: inEl.url || "", description: inEl.description,
                                        title: "AZURE"
                                    })
                            })
                    });
            }
                break;
            case "GITHUB":
            case "GITHUB_CODEPEN": {
                if (github)
                    github.forEach(el => {
                        if (el.imgSrc)
                            newConsolidated.push({ imgSrc: el.imgSrc, url: el.url || "", description: el.description, title: "GITHUB" });
                    });
            }
            case "CODEPEN":
            case "GITHUB_CODEPEN": {
                if (codepen)
                    codepen.forEach(el => {
                        if (el.imgSrc)
                            newConsolidated.push({ imgSrc: el.imgSrc, url: el.url || "", description: "", title: "CODEPEN" });
                    });
            }
        }
        setData(newConsolidated);
    }, [firebase, azure, netlify, github, codepen, type, setData]);
    return { data };
}

