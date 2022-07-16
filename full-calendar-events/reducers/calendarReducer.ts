import { calendarContextType, reducerActionType } from "../model";

export default function calendarReducer(currState: calendarContextType, action: reducerActionType): calendarContextType {
    let newState = { ...currState };
    let { name } = action;
    switch (name) {
        case "SET_TODAY": {
            newState.currMonthIndex = new Date().getMonth();
            newState.currYear = new Date().getFullYear();
            break;
        }
        case "REDUCE_MONTH": {
            if (newState.currMonthIndex != 0)
                newState.currMonthIndex--;
            else {
                newState.currMonthIndex = 11;
                if (newState.currYear != 1900)
                    newState.currYear--;
            }
            break;
        }
        case "INCREASE_MONTH": {
            if (newState.currMonthIndex != 11)
                newState.currMonthIndex++
            else {
                newState.currMonthIndex = 0
                if (newState.currYear != 9999)
                    newState.currYear++
            }
            break;
        }
    }
    return newState;

}