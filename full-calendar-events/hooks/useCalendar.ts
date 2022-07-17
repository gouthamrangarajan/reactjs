import { useCallback, useContext, useEffect, useState } from "react";
import { CalendarActionContext, CalendarContext } from "../contexts/CalendarContextProvider";
import { calendarDataType } from "../model";

export default function useCalendar(): useCalendarReturnType {
    let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayNamesShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let [weeksData, setWeeksData] = useState<calendarDataType>([]);

    let { currYear, currMonthIndex, currDayOfTheMonth } = useContext(CalendarContext);
    let dispatch = useContext(CalendarActionContext);

    let [prevYear, setPrevYear] = useState(new Date().getFullYear());
    let [prevMonthIndex, setPrevMonthIndex] = useState(new Date().getMonth());
    let [prevDayOftheMonth, setPrevDayOfMonth] = useState(new Date().getDate());

    let nextMonth = useCallback(() => {
        dispatch({ name: "SET_NEXT_MONTH", payload: undefined });
    }, []);

    let nextDay = useCallback(() => {
        dispatch({ name: "SET_NEXT_DATE", payload: undefined });
    }, []);

    let prevMonth = useCallback(() => {
        dispatch({ name: "SET_PREVIOUS_MONTH", payload: undefined });
    }, []);

    let prevDay = useCallback(() => {
        dispatch({ name: "SET_PREVIOUS_DATE", payload: undefined });
    }, []);

    let setDate = useCallback((dt: Date) => {
        dispatch({ name: "SET_DATE", payload: dt });
    }, []);

    let today = useCallback(() => {
        dispatch({ name: "SET_TODAY", payload: undefined });
    }, []);

    useEffect(() => {
        var retDt: calendarDataType = [];
        var firstDt = new Date(currYear, currMonthIndex, 1)
        var dy = firstDt.getDay()
        var firstArr = [{ date: 1, ind: 'curr' }]
        while (dy > 0) {
            if (firstArr[0].date == 1) {
                var prevMonthLastDate = new Date(currYear, currMonthIndex, 0).getDate()
                firstArr.unshift({ date: prevMonthLastDate, ind: 'prev' })
            }
            else {
                firstArr.unshift({ date: firstArr[0].date - 1, ind: 'prev' })
            }
            dy--;
        }
        while (firstArr.length < 7) {
            firstArr.push({ date: firstArr[firstArr.length - 1].date + 1, ind: 'curr' })
        }
        retDt.push(firstArr)
        var lastDate = new Date(currYear, currMonthIndex + 1, 0).getDate()
        var lastEntry = firstArr[firstArr.length - 1].date
        var completed = false
        while (lastEntry < lastDate && !completed) {
            var otherArr = []
            for (i = 1; i <= 7; i++) {
                if (lastEntry + i <= lastDate) {
                    otherArr.push({ date: lastEntry + i, ind: 'curr' })
                }
            }
            var i = 1;
            while (otherArr.length < 7) {
                completed = true
                otherArr.push({ date: i, ind: 'next' })
                i++
            }
            retDt.push(otherArr)
            lastEntry = otherArr[otherArr.length - 1].date
        }
        setWeeksData(retDt);
    }, [currYear, currMonthIndex]);

    useEffect(() => {
        setPrevYear(currYear);
    }, [currYear]);

    useEffect(() => {
        setPrevMonthIndex(currMonthIndex);
    }, [currMonthIndex]);

    useEffect(() => {
        setPrevDayOfMonth(currDayOfTheMonth);
    }, [currDayOfTheMonth])

    return {
        dayNames, dayNamesShort, monthNames, monthNamesShort, weeksData,
        currYear, prevYear, currMonthIndex, prevMonthIndex, currDayOfTheMonth, prevDayOftheMonth,
        nextMonth, prevMonth, today, nextDay, prevDay, setDate
    };
}

type useCalendarReturnType = {
    dayNames: string[];
    dayNamesShort: string[];
    monthNames: string[],
    monthNamesShort: string[];
    weeksData: calendarDataType;
    currYear: number;
    prevYear: number;
    currMonthIndex: number;
    prevMonthIndex: number;
    currDayOfTheMonth: number;
    prevDayOftheMonth: number;
    nextMonth: () => void;
    prevMonth: () => void;
    today: () => void;
    nextDay: () => void;
    prevDay: () => void;
    setDate: (dt: Date) => void;
}