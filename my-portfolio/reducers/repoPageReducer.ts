
import { repoPageContextType, reducerActionType } from "../models/dataType";

export default function cloudPageReducer(currentContext: repoPageContextType, action: reducerActionType<string>)
    : repoPageContextType {
    let newContext = { ...currentContext };
    let { name, payload } = action;
    if (payload)
        payload = payload.trim();
    switch (name) {
        case "SET_REPO_FILTER": {
            if (payload) {
                newContext.repoFilter = payload;
                newContext.textFilter = "";
            }
            break;
        }
        case "SET_TEXT_FILTER": {
            newContext.repoFilter = "";
            newContext.textFilter = payload as string;
            break;
        }
        case "RESET_REPO_FILTER": {
            newContext.repoFilter = "";
            break;
        }
        case "RESET_TEXT_FILTER": {
            newContext.textFilter = "";
            break;
        }
        case "RESET_ALL": {
            newContext.repoFilter = "";
            newContext.textFilter = "";
            break;
        }
    }
    return newContext;
}