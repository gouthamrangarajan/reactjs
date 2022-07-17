import { calendarContextType, reducerActionType } from "../model";

export default function calendarReducer(currState: calendarContextType, action: reducerActionType): calendarContextType {
    let newState = { ...currState };
    let { name, payload } = action;
    switch (name) {
        case "SET_TODAY": {
            newState.currMonthIndex = new Date().getMonth();
            newState.currYear = new Date().getFullYear();
            newState.currDayOfTheMonth = new Date().getDate();
            break;
        }
        case "SET_PREVIOUS_MONTH": {
            if (newState.currMonthIndex != 0)
                newState.currMonthIndex--;
            else {
                newState.currMonthIndex = 11;
                if (newState.currYear != 1900)
                    newState.currYear--;
            }
            newState.currDayOfTheMonth = 1;
            break;
        }
        case "SET_NEXT_MONTH": {
            if (newState.currMonthIndex != 11)
                newState.currMonthIndex++
            else {
                newState.currMonthIndex = 0
                if (newState.currYear != 9999)
                    newState.currYear++
            }
            newState.currDayOfTheMonth = 1;
            break;
        }
        case "SET_DATE": {
            if (!isNaN(Date.parse(payload))) {
                let dt = (payload as Date);
                newState.currDayOfTheMonth = dt.getDate();
                newState.currMonthIndex = dt.getMonth();
                newState.currYear = dt.getFullYear();
            }
            break;
        }
        case "SET_NEXT_DATE": {
            let dt = new Date(newState.currYear, newState.currMonthIndex, newState.currDayOfTheMonth);
            dt.setDate(newState.currDayOfTheMonth + 1);
            newState.currDayOfTheMonth = dt.getDate();
            newState.currMonthIndex = dt.getMonth();
            newState.currYear = dt.getFullYear();
            break;
        }
        case "SET_PREVIOUS_DATE": {
            let dt = new Date(newState.currYear, newState.currMonthIndex, newState.currDayOfTheMonth);
            dt.setDate(newState.currDayOfTheMonth - 1);
            newState.currDayOfTheMonth = dt.getDate();
            newState.currMonthIndex = dt.getMonth();
            newState.currYear = dt.getFullYear();
            break;
        }
    }
    return newState;

}