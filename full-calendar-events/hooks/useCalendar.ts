import { addDays, isEqual, startOfWeek } from "date-fns";
import { useCallback, useContext, useEffect, useState } from "react";
import { CalendarActionContext, CalendarContext } from "../contexts/CalendarContextProvider";
import { calendarDataType, weekDataType } from "../model";

export default function useCalendar(): useCalendarReturnType {

    let [monthData, setMonthData] = useState<calendarDataType>([]);
    let [weekData, setWeekData] = useState<weekDataType>([]);

    let { currYear, currMonthIndex, currDayOfTheMonth, currWeekOfTheYear } = useContext(CalendarContext);
    let dispatch = useContext(CalendarActionContext);

    let [prevYear, setPrevYear] = useState(new Date().getFullYear());
    let [prevMonthIndex, setPrevMonthIndex] = useState(new Date().getMonth());
    let [prevDayOftheMonth, setPrevDayOfMonth] = useState(new Date().getDate());
    let [prevWeekOfTheYear, setPrevWeekOfTheYear] = useState(currWeekOfTheYear);

    let nextMonth = useCallback(() => {
        dispatch({ name: "SET_NEXT_MONTH", payload: undefined });
    }, []);
    let nextWeek = useCallback(() => {
        dispatch({ name: "SET_NEXT_WEEK", payload: undefined });
    }, []);
    let nextDay = useCallback(() => {
        dispatch({ name: "SET_NEXT_DATE", payload: undefined });
    }, []);

    let prevMonth = useCallback(() => {
        dispatch({ name: "SET_PREVIOUS_MONTH", payload: undefined });
    }, []);
    let prevWeek = useCallback(() => {
        dispatch({ name: "SET_PREV_WEEK", payload: undefined });
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
        let retDt: calendarDataType = [];
        let firstDt = new Date(currYear, currMonthIndex, 1)
        let possibleOtherMonthDate = startOfWeek(firstDt);
        let firstArr: Array<{ date: number, ind: string | number }> = [];
        while (!isEqual(firstDt, possibleOtherMonthDate)) {
            firstArr.push({ date: possibleOtherMonthDate.getDate(), ind: 'prev' })
            possibleOtherMonthDate = addDays(possibleOtherMonthDate, 1);
        }
        firstArr.push({ date: 1, ind: 'curr' });
        while (firstArr.length < 7) {
            firstArr.push({ date: firstArr[firstArr.length - 1].date + 1, ind: 'curr' })
        }
        retDt.push(firstArr);
        let lastDate = new Date(currYear, currMonthIndex + 1, 0).getDate()
        let lastEntry = firstArr[firstArr.length - 1].date;
        let completed = false
        while (lastEntry < lastDate && !completed) {
            let otherArr = [];
            let i = 1;
            for (i = 1; i <= 7; i++) {
                if (lastEntry + i <= lastDate) {
                    otherArr.push({ date: lastEntry + i, ind: 'curr' })
                }
            }
            i = 1;
            while (otherArr.length < 7) {
                completed = true
                otherArr.push({ date: i, ind: 'next' })
                i++
            }
            retDt.push(otherArr)
            lastEntry = otherArr[otherArr.length - 1].date
        }
        setMonthData(retDt);
    }, [currYear, currMonthIndex]);

    useEffect(() => {
        let retDt: weekDataType = [];
        let firstDateOfCurrWeek = startOfWeek(new Date(currYear, currMonthIndex, currDayOfTheMonth));
        retDt.push(firstDateOfCurrWeek);
        for (let i = 1; i <= 6; i++)
            retDt.push(new Date(firstDateOfCurrWeek.getFullYear(), firstDateOfCurrWeek.getMonth(), firstDateOfCurrWeek.getDate() + i));
        setWeekData(retDt);
    }, [currWeekOfTheYear, currYear, currMonthIndex]);

    useEffect(() => {
        setPrevYear(currYear);
    }, [currYear]);

    useEffect(() => {
        setPrevMonthIndex(currMonthIndex);
    }, [currMonthIndex]);

    useEffect(() => {
        setPrevWeekOfTheYear(currWeekOfTheYear);
    }, [currWeekOfTheYear]);

    useEffect(() => {
        setPrevDayOfMonth(currDayOfTheMonth);
    }, [currDayOfTheMonth])

    return {
        weekData, monthData, currYear, prevYear, currMonthIndex, prevMonthIndex, currDayOfTheMonth, prevDayOftheMonth,
        currWeekOfTheYear, prevWeekOfTheYear, nextMonth, prevMonth, today, nextDay, prevDay, setDate,
        prevWeek, nextWeek
    };
}

type useCalendarReturnType = {
    weekData: weekDataType;
    monthData: calendarDataType;
    currYear: number;
    prevYear: number;
    currMonthIndex: number;
    prevMonthIndex: number;
    currDayOfTheMonth: number;
    prevDayOftheMonth: number;
    currWeekOfTheYear: number;
    prevWeekOfTheYear: number;
    nextMonth: () => void;
    prevMonth: () => void;
    today: () => void;
    nextDay: () => void;
    prevDay: () => void;
    setDate: (dt: Date) => void;
    prevWeek: () => void;
    nextWeek: () => void;
}