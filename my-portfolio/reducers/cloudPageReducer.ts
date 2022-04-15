
import { cloudPageContextType, reducerActionType } from "../models/dataType";

export default function cloudPageReducer(currentContext: cloudPageContextType, action: reducerActionType<string>)
    : cloudPageContextType {
    let newContext = { ...currentContext };
    let { name, payload } = action;
    if (payload)
        payload = payload.trim();
    switch (name) {
        case "SET_CLOUD_PROVIDER_FILTER": {
            if (payload) {
                newContext.cloudProviderFilter = payload;
                newContext.applicationTypeFilter = "";
                newContext.textFilter = "";
            }
            break;
        }
        case "SET_APPLICATION_TYPE_FILTER": {
            if (payload) {
                newContext.applicationTypeFilter = payload;
                newContext.cloudProviderFilter = "";
                newContext.textFilter = "";
            }
            break;
        }
        case "SET_TEXT_FILTER": {
            newContext.applicationTypeFilter = "";
            newContext.cloudProviderFilter = "";
            newContext.textFilter = payload as string;
            break;
        }
        case "RESET_CLOUD_PROVIDER_FILTER": {
            newContext.cloudProviderFilter = "";
            break;
        }
        case "RESET_APPLICATION_TYPE_FILTER": {
            newContext.applicationTypeFilter = "";
            break;
        }
        case "RESET_TEXT_FILTER": {
            newContext.textFilter = "";
            break;
        }
        case "RESET_ALL": {
            newContext.applicationTypeFilter = "";
            newContext.cloudProviderFilter = "";
            newContext.textFilter = "";
            break;
        }
    }
    return newContext;
}