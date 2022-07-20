import { addDays, eachWeekOfInterval, startOfWeek } from "date-fns";
import { useCallback, useContext, useEffect, useState } from "react";
import { CalendarActionContext, CalendarContext } from "../contexts/CalendarContextProvider";
import { monthDataType, weekDataType } from "../model";

export default function useCalendar(): useCalendarReturnType {

    let [monthData, setMonthData] = useState<monthDataType>([]);
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
        let retDt: monthDataType = [];
        let firstDtOfMonth = new Date(currYear, currMonthIndex, 1);
        let lastDtOfMonth = new Date(currYear, currMonthIndex + 1, 0);
        let range = eachWeekOfInterval({ start: firstDtOfMonth, end: lastDtOfMonth });

        range.forEach((firstDateOfEachWeek: Date) => {
            let arr: Array<{ date: Date, ind: string }> = [];
            for (let i = 0; i < 7; i++) {
                let dt = addDays(firstDateOfEachWeek, i);
                let ind = dt.getMonth() < currMonthIndex ? 'prev' : dt.getMonth() > currMonthIndex ? 'next' : 'curr';
                arr.push({ date: dt, ind });
            }
            retDt.push(arr);
        });


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
    monthData: monthDataType;
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