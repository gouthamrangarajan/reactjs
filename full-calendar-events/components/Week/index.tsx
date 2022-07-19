import { motion } from "framer-motion";
import { useContext } from "react";
import { eventAnimate, moveNext, movePrev } from "../../animation";
import { EventsContext } from "../../contexts/EventsContextProvider";
import useCalendar from "../../hooks/useCalendar"
import DraggableCalendarEvent from "../DraggableCalendarEvent";
import Block from "../TimeRangeBlock";
import { getDayEvents } from "../../util";
import { format } from "date-fns";
import { TIME_ARRAY } from "../../model";
import ResizableCalendarEvent from "../ResizableCalendarEvent";


function Index() {

    let { weekData, currYear, prevYear, currWeekOfTheYear, prevWeekOfTheYear, currMonthIndex } = useCalendar();
    let events = useContext(EventsContext);

    return (
        <motion.table className="table-fixed w-full h-full bg-transparent overflow-hidden">
            <tbody>
                <motion.tr key={`tr_${currWeekOfTheYear}`}
                    variants={prevYear < currYear || prevWeekOfTheYear < currWeekOfTheYear ? moveNext : movePrev}
                    initial="initial" animate="animate">
                    {weekData.map((dt, weekIndex) =>
                    (
                        <td key={`td_${weekIndex}_${currWeekOfTheYear}`} className="border-r border-gray-300">
                            <div className="flex flex-col space-y-1 items-center">
                                <span className="select-none">{format(dt, "E")}</span>
                                <h5 className={` px-2 py-1
                                            text-center mb-1 rounded select-none
                                ${dt.getDate() == new Date().getDate()
                                        && currMonthIndex == new Date().getMonth()
                                        && currYear == new Date().getFullYear()
                                        ? "bg-blue-600 text-white" : ""}`}>
                                    <>
                                        {dt.getDate()}&nbsp;
                                        {dt.getDate() == 1 ? format(dt, "MMM")
                                            : <></>}
                                    </>
                                </h5>
                            </div>
                            <div className="flex flex-col items-center relative h-full w-full">
                                {TIME_ARRAY.map((el, timeIndex) => (
                                    <div className="flex w-full items-start" key={`${dt.getDate()}_${el}`}>
                                        {weekIndex == 0 && (<span className="text-gray-600 text-xs px-3 -mt-2 w-16 select-none">{el}</span>)}
                                        <Block index={timeIndex} date={dt}></Block>
                                    </div>
                                ))}
                                {getDayEvents(events, dt.getFullYear(), dt.getMonth(), dt.getDate()).map(el => (
                                    <ResizableCalendarEvent key={el.randomIdForUIKey} event={el}
                                        widthAndLeft={`${dt == weekData[0] ? "left-2 w-8/12 ml-12" : "left-0 w-full"}`}></ResizableCalendarEvent>
                                ))}
                            </div>
                        </td>
                    )
                    )}
                </motion.tr>
            </tbody>
        </motion.table>
    )
}

export default Index;
