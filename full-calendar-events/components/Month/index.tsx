import { motion } from "framer-motion";
import { useContext } from "react";
import { eventAnimate, moveNext, movePrev } from "../../animation";
import { EventsContext } from "../../contexts/EventsContextProvider";
import useCalendar from "../../hooks/useCalendar"
import DraggableCalendarEvent from "../DraggableCalendarEvent";
import Td from "./Block";
import { getDayEvents } from "../../util";


function Index() {

    let { weeksData, dayNames, monthNamesShort, currYear, prevYear, currMonthIndex, prevMonthIndex } = useCalendar();
    let events = useContext(EventsContext);

    return (
        <motion.table className="table-fixed w-full h-full bg-transparent overflow-hidden">
            <tbody>
                {weeksData.map((dt, index) =>
                (<motion.tr key={`tr_${index}_${currMonthIndex}`}
                    variants={prevYear < currYear || prevMonthIndex < currMonthIndex ? moveNext : movePrev}
                    initial="initial" animate="animate">
                    {dt.map((idt, index1) =>
                    (
                        <Td key={`td_${index}_${index1}`} date={new Date(currYear, currMonthIndex, idt.date)}
                            allowDrop={idt.ind == 'curr'}>
                            {index == 0 && <span className="select-none">{dayNames[index1]}</span>}
                            <h5 className={`${idt.ind != 'curr' ? "text-gray-400" : ""} px-2 py-1
                                            text-center mb-1 rounded select-none
                                ${idt.ind == 'curr' && idt.date == new Date().getDate()
                                    && currMonthIndex == new Date().getMonth()
                                    && currYear == new Date().getFullYear()
                                    ? "bg-blue-600 text-white" : ""}`}>
                                <>
                                    {idt.date}&nbsp;
                                    {idt.date == 1 && index == 0 ? monthNamesShort[currMonthIndex]
                                        : idt.date == 1 ? monthNamesShort[currMonthIndex + 1] : <></>}
                                </>
                            </h5>
                            {idt.ind == 'curr' && getDayEvents(events, currYear, currMonthIndex, idt.date, "").map(el => (
                                <motion.div className="w-full" key={el.randomIdForUIKey}
                                    variants={eventAnimate} initial="initial" animate="animate">
                                    <DraggableCalendarEvent info={el} width="w-10/12" padding="py-1 px-3"></DraggableCalendarEvent>
                                </motion.div>
                            ))}
                        </Td>
                    )
                    )}
                </motion.tr>)
                )}
            </tbody>
        </motion.table>
    )
}

export default Index;
