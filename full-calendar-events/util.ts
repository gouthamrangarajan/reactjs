import { compareAsc } from "date-fns";
import { TIME_ARRAY } from "./model"

export const getDateTimeArrayFromTimeArray = (year: number, monthIndex: number, dayOfTheMonth: number): Array<Date> => {
    let ret = TIME_ARRAY.map(el => {
        if (el == '')
            return new Date(year, monthIndex, dayOfTheMonth, 0, 0, 0);
        else if (el.includes('AM'))
            return new Date(year, monthIndex, dayOfTheMonth, parseInt(el.replace('AM', '')), 0, 0);
        else {
            let hrs = parseInt(el.replace('PM', ''));
            if (hrs < 12)
                hrs = hrs + 12;
            return new Date(year, monthIndex, dayOfTheMonth, hrs, 0, 0);
        }
    });
    return ret.sort(compareAsc);
}

export const calculateTimeRange = (totalHeight: number, currTime: string, currIndex: number): string => {
    //height 56 is one hour   
    //every fifteen minute is 56/4~14            
    let totalNumberOfFifteenMinutes = Math.floor(totalHeight / 14);
    let totalNumberOfHours = Math.floor(totalNumberOfFifteenMinutes / 4);
    let timeRange = currTime;
    let endHours = currTime;
    if (totalNumberOfHours > 0) {
        totalNumberOfFifteenMinutes = totalNumberOfFifteenMinutes - (totalNumberOfHours * 4);
        endHours = TIME_ARRAY[currIndex + totalNumberOfHours];
    }
    let minutes = "";
    if (totalNumberOfFifteenMinutes > 0)
        minutes = "15";
    if (totalNumberOfFifteenMinutes > 1)
        minutes = "30";
    if (totalNumberOfFifteenMinutes > 2)
        minutes = "45";
    let isAMInEndHours = endHours.includes("AM") ? true : false;
    endHours = endHours.replace("AM", "").replace("PM", "").trim();
    if (minutes != "")
        timeRange = `${timeRange} - ${endHours}:${minutes} ${isAMInEndHours ? "AM" : "PM"}`;
    else {
        if (timeRange != `${endHours} ${isAMInEndHours ? "AM" : "PM"}`)
            timeRange = `${timeRange} - ${endHours} ${isAMInEndHours ? "AM" : "PM"}`;
    }
    return timeRange;
}