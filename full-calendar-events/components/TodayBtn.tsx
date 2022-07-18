import useCalendar from "../hooks/useCalendar"


function TodayBtn() {
    let { today } = useCalendar();
    return (
        <button className='appearance-none outline-none bg-white rounded py-2 px-4 transition duration-300 hover:opacity-90
        focus:bg-gray-50 text-gray-700 border border-gray-300 font-semibold'
            onClick={today}>Today</button>
    )
}

export default TodayBtn