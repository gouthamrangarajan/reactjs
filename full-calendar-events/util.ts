import { compareAsc, intervalToDuration, minutesToHours } from "date-fns";
import { MotionValue } from "framer-motion";
import { calendarEventType, TIME_ARRAY } from "./model"


export const getDateTimeArrayFromTimeArray = (year: number, monthIndex: number, dayOfTheMonth: number): Array<Date> =>
    TIME_ARRAY.map(el => {
        return getDateTimeFromDateAndTime(year, monthIndex, dayOfTheMonth, el);
    }).sort(compareAsc);

export const getDateTimeFromDateAndTime = (year: number, monthIndex: number,
    dayOfTheMonth: number, time: string): Date => {
    let minutes = 0;
    if (time.includes(":")) {
        minutes = parseInt(time.substring(time.indexOf(":") + 1, time.indexOf(" ")));
        time = time.replace(`:${minutes.toString()}`, "");
    }
    if (time == '')
        return new Date(year, monthIndex, dayOfTheMonth, 0, 0, 0);
    if (time.includes('AM'))
        return new Date(year, monthIndex, dayOfTheMonth, parseInt(time.replace('AM', '')), minutes, 0);
    let hrs = parseInt(time.replace('PM', ''));
    if (hrs < 12)
        hrs = hrs + 12;
    return new Date(year, monthIndex, dayOfTheMonth, hrs, minutes, 0);
}

export const calculateTimeRange = (totalHeight: number, currTime: string, currIndex: number): string => {
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
    if (endHours) {
        let isAMInEndHours = endHours.includes("AM") ? true : false;
        endHours = endHours.replace("AM", "").replace("PM", "").trim();
        if (minutes != "")
            timeRange = `${timeRange} - ${endHours}:${minutes} ${isAMInEndHours ? "AM" : "PM"}`;
        else {
            if (timeRange != `${endHours} ${isAMInEndHours ? "AM" : "PM"}`)
                timeRange = `${timeRange} - ${endHours} ${isAMInEndHours ? "AM" : "PM"}`;
        }
    }
    return timeRange;
}
export const calculateHeightFromTimeRange = (fromTime: string, toTime: string): number => {
    //height 56 is one hour   
    //every fifteen minute is 56/4~14            
    let start: Date = getDateTimeFromDateAndTime(new Date().getFullYear(), new Date().getMonth(),
        new Date().getDate(), fromTime);
    let end: Date = getDateTimeFromDateAndTime(new Date().getFullYear(), new Date().getMonth(),
        new Date().getDate(), toTime);

    let interval: Interval = { start, end };
    let duration: Duration = intervalToDuration(interval);

    let totalHeight = 0;
    if (duration.hours)
        totalHeight += duration.hours * 56;
    if (duration.minutes)
        totalHeight += duration.minutes * 14;
    return totalHeight;
}
export const getMarginTopFromTime = (time: string): string => {
    //height 56 is one hour   
    //every fifteen minute is 56/4~14   
    if (time.includes(":")) {
        let minutes = parseInt(time.substring(time.indexOf(":") + 1, time.indexOf(" ")));
        return `${Math.floor(minutes / 15) * 14}px`;
    }
    return "0";
}
export const getDayOfWeek = (dayNames: string[], dayOfTheMonth: number, monthIndex: number, year: number): string =>
    dayNames[new Date(year, monthIndex, dayOfTheMonth).getDay()];

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
            let bDateTime = getDateTimeFromDateAndTime(b.date.getFullYear(), b.date.getMonth(), b.date.getDate(), a.from);
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

export const getMarginBottomOfDayCalendarItem = (itemHeight: MotionValue<number>): string => `-${itemHeight.get() - 5}px`
export const getMarginTopOfDayCalendarItem = (itemHeight: MotionValue<number>): string => `${itemHeight.get() - 5}px`