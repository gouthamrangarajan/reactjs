import { motion } from "framer-motion";
import { useContext } from "react";
import { moveNext, movePrev } from "../../animation";
import { EventsContext } from "../../contexts/EventsContextProvider";
import useCalendar from "../../hooks/useCalendar"
import { calendarEventType } from "../../model";
import CalendarEvent from "../CalendarEvent";
import Td from "./Block";


function Calendar() {

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
                            {index == 0 && <span>{dayNames[index1]}</span>}
                            <h5 className={`${idt.ind != 'curr' ? "text-gray-400" : "text-black"} px-2 py-1
                                                     text-center mb-1
                                                        `}><>{idt.date}&nbsp;
                                    {idt.date == 1 && index == 0 ? monthNamesShort[currMonthIndex]
                                        : idt.date == 1 ? monthNamesShort[currMonthIndex + 1] : <></>}
                                </>
                            </h5>
                            {idt.ind == 'curr' && getDayEvents(events, currYear, currMonthIndex, idt.date).map(el => (
                                <motion.div className="w-full" key={el.randomIdForUIKey} initial={{ scale: 1.1 }}
                                    animate={{ scale: 1, transition: { duration: 0.3, ease: 'easeInOut' } }}>
                                    <CalendarEvent info={el} width="w-10/12" padding="py-1 px-3"></CalendarEvent>
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

export default Calendar;

const getDayEvents = (events: calendarEventType[], yr: number, monthIdx: number, date: number): calendarEventType[] => {
    let ft = events.filter(el => el.date &&
        yr == el.date.getFullYear() && monthIdx == el.date.getMonth() && date == el.date.getDate()
    );
    ft = [...ft];
    return ft.sort((a, b) => a > b ? 1 : -1);
}