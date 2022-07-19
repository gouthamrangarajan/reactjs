import { compareAsc, format, intervalToDuration, minutesToHours } from "date-fns";
import { calendarEventType, TIME_ARRAY } from "./model"


export const getDateTimeArrayFromTimeArray = (year: number, monthIndex: number, dayOfTheMonth: number): Array<Date> =>
    TIME_ARRAY.map(el => {
        return getDateTimeFromDateAndTime(year, monthIndex, dayOfTheMonth, el);
    }).sort(compareAsc);

export const getDateTimeFromDateAndTime = (year: number, monthIndex: number,
    dayOfTheMonth: number, time: string | undefined): Date => {
    let hrs = 0;
    let minutes = 0;
    if (time && time.trim() != '') {
        if (time.includes(":")) {
            minutes = parseInt(time.substring(time.indexOf(":") + 1, time.indexOf(" ")));
            time = time.replace(`:${minutes.toString()}`, "");
        }
        if (time.includes('AM'))
            return new Date(year, monthIndex, dayOfTheMonth, parseInt(time.replace('AM', '')), minutes, 0);

        hrs = parseInt(time.replace('PM', ''));
        if (hrs < 12)
            hrs = hrs + 12;
    }
    return new Date(year, monthIndex, dayOfTheMonth, hrs, minutes, 0);
}

export const calculateTimeRange = (totalHeight: number, currTime: string | undefined, currIndex: number): string => {
    //height 56 is one hour   
    //every fifteen minute is 56/4~14            
    let totalNumberOfFifteenMinutes = Math.floor(totalHeight / 14);
    let totalNumberOfHours = minutesToHours(totalNumberOfFifteenMinutes * 15);
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

    if (!endHours)
        endHours = "12 AM"; //e.g 11 PM - 12 AM

    let isAMInEndHours = endHours.includes("AM") ? true : false;
    endHours = endHours.replace("AM", "").replace("PM", "").trim();
    if (minutes != "")
        timeRange = `${timeRange} - ${endHours}:${minutes} ${isAMInEndHours ? "AM" : "PM"}`;
    else {
        if (timeRange != `${endHours} ${isAMInEndHours ? "AM" : "PM"}`)
            timeRange = `${timeRange} - ${endHours} ${isAMInEndHours ? "AM" : "PM"}`;
    }

    return timeRange || "";
}
export const calculateHeightFromTimeRange = (fromTime: string | undefined, toTime: string | undefined): number => {
    //height 56 is one hour   
    //every fifteen minute is 56/4~14            
    let start: Date = getDateTimeFromDateAndTime(new Date().getFullYear(), new Date().getMonth(),
        new Date().getDate(), fromTime);
    let end: Date = getDateTimeFromDateAndTime(new Date().getFullYear(), new Date().getMonth(),
        new Date().getDate(), toTime);

    if (toTime == "12 AM") // e.g 11 PM - 12 AM
        end = getDateTimeFromDateAndTime(new Date().getFullYear(), new Date().getMonth(),
            new Date().getDate() + 1, toTime);

    let interval: Interval = { start, end };
    let duration: Duration = intervalToDuration(interval);

    let totalHeight = 0;
    if (duration.hours)
        totalHeight += duration.hours * 56;
    if (duration.minutes)
        totalHeight += Math.floor(duration.minutes / 15) * 14;
    return totalHeight;
}
export const getMarginTopForTime = (time: string | undefined, isRelative: boolean): string => {
    //height 56 is one hour   
    //every fifteen minute is 56/4~14   
    let retVal = 0;

    let hrs = 0;
    if (time) {
        if (time.includes(":")) {
            hrs = parseInt(time.substring(0, time.indexOf(":")).trim());
            let minutes = parseInt(time.substring(time.indexOf(":") + 1, time.indexOf(" ")));
            retVal += Math.floor(minutes / 15) * 14;
        }
        else {
            hrs = parseInt(time.substring(0, time.indexOf(" ")).trim());
            if (time.includes("PM") && hrs < 12)
                hrs += 12;
        }
    }
    if (!isRelative)
        retVal += hrs * 56;

    return `${retVal}px`;
}
export const getDayName = (dayOfTheMonth: number, monthIndex: number, year: number): string =>
    format(new Date(year, monthIndex, dayOfTheMonth), "E");

export const getMonthNameShort = (monthIndex: number): string => format(new Date(new Date().setMonth(monthIndex)), "MMM")

export const getMonthName = (monthIndex: number): string => format(new Date(new Date().setMonth(monthIndex)), "MMMM")


export const getDayEvents = (events: calendarEventType[], yr: number, monthIdx: number,
    date: number, time: string): calendarEventType[] => {
    let ft = events.filter(el => el.date &&
        yr == el.date.getFullYear() && monthIdx == el.date.getMonth() && date == el.date.getDate()
    );
    if (time != "") {
        ft = ft.filter(el => {
            if (el.from) {
                let timeToCheck = replaceMinutesInTime(el.from);
                return timeToCheck.includes(time);
            }
            return false;
        });
    }
    ft = [...ft];
    return ft.sort((a, b) => {
        if (a.date && b.date) {
            let aDateTime = getDateTimeFromDateAndTime(a.date.getFullYear(), a.date.getMonth(), a.date.getDate(), a.from);
            let bDateTime = getDateTimeFromDateAndTime(b.date.getFullYear(), b.date.getMonth(), b.date.getDate(), b.from);
            return compareAsc(aDateTime, bDateTime);
        }
        else if (a.date)
            return 1;
        else if (b.date)
            return -1;
        return 0;
    });
}

export const replaceMinutesInTime = (time: string): string => {
    let timeToCheck = time;
    if (timeToCheck.includes(":")) {
        let minutes = parseInt(timeToCheck.substring(timeToCheck.indexOf(":") + 1, timeToCheck.indexOf(" ")));
        timeToCheck = timeToCheck.replace(`:${minutes.toString()}`, "");
    }
    return timeToCheck;
}