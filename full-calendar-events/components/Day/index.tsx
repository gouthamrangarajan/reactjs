import useCalendar from "../../hooks/useCalendar";

function Index() {

    let { currDayOfTheMonth, monthNames, currMonthIndex, currYear } = useCalendar();

    return (
        <div>{currDayOfTheMonth} {monthNames[currMonthIndex]} {currYear}</div>
    )
}

export default Index