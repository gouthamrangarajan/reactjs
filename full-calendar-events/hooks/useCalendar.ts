import { useEffect, useState } from "react";
import { calendarDataType } from "../model";

export default function useCalendar(): useCalendarReturnType {
    let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let [weeksData, setWeeksData] = useState<calendarDataType>([]);
    let [currYear, setCurrYear] = useState(new Date().getFullYear());
    let [currMonthIndex, setCurrMonthIndex] = useState(new Date().getMonth());

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

    return { dayNames, monthNamesShort, weeksData, currYear, currMonthIndex, setCurrYear, setCurrMonthIndex };
}

type useCalendarReturnType = {
    dayNames: string[];
    monthNamesShort: string[];
    weeksData: calendarDataType;
    currYear: number;
    currMonthIndex: number;
    setCurrYear: (val: number) => void;
    setCurrMonthIndex: (val: number) => void;
}