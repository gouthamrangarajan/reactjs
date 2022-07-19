import { motion } from "framer-motion"
import { useContext, useRef } from "react";
import { DragItemActionsContext, DragItemContext } from "../contexts/DragItemContextProvider"
import { calendarEventType } from "../model";


function DraggableCalendarEvent({ info, width, padding, margin }: CalendarEventPropsType) {
  let { dragConstraintEl } = useContext(DragItemContext);
  let { setAnyItemDragged, setDraggedItemData } = useContext(DragItemActionsContext);

  return (
    <motion.div drag className={`${width} ${padding} ${margin ? margin : "mx-auto"} bg-indigo-600 text-white text-sm rounded shadow 
            cursor-pointer truncate`}
      whileDrag={{ scale: 0.9 }} dragConstraints={dragConstraintEl as React.RefObject<Element>}
      // onDrag={callBackDrag}// does not work
      onDragEnd={() => {
        setAnyItemDragged(false);
      }}
      onDragStart={() => {
        setAnyItemDragged(true);
        setDraggedItemData(info);
      }}
      layout="position"
    >
      <span className="select-none">{info.title}</span>
    </motion.div>
  )
}
type CalendarEventPropsType = {
  info: calendarEventType;
  width: string;
  padding: string;
  margin: string;
}
export default DraggableCalendarEvent