import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { eventAnimate, moveNext, movePrev } from "../../animation";
import { EventsContext } from "../../contexts/EventsContextProvider";
import useCalendar from "../../hooks/useCalendar"
import DraggableCalendarEvent from "../DraggableCalendarEvent";
import Td from "../Block";
import { getDayEvents } from "../../util";
import { format } from "date-fns";


function Index() {

    let { weekData, currYear, prevYear, currWeekOfTheYear, prevWeekOfTheYear, currMonthIndex } = useCalendar();
    let events = useContext(EventsContext);

    return (
        <motion.table className="table-fixed w-full h-full bg-transparent overflow-hidden">
            <tbody>
                <motion.tr key={`tr_${currWeekOfTheYear}`}
                    variants={prevYear < currYear || prevWeekOfTheYear < currWeekOfTheYear ? moveNext : movePrev}
                    initial="initial" animate="animate">
                    {weekData.map((dt, index) =>
                    (
                        <Td key={`td_${index}_${currWeekOfTheYear}`} date={dt}
                            allowDrop={true} isWeekCalendar={true}>
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
                            {getDayEvents(events, currYear, currMonthIndex, dt.getDate(), "").map(el => (
                                <motion.div className="w-full" key={el.randomIdForUIKey}
                                    variants={eventAnimate} initial="initial" animate="animate">
                                    <DraggableCalendarEvent info={el} width="w-10/12" padding="py-1 px-3" margin="mt-6 mx-auto"></DraggableCalendarEvent>
                                </motion.div>
                            ))}
                        </Td>
                    )
                    )}
                </motion.tr>
            </tbody>
        </motion.table>
    )
}

export default Index;
