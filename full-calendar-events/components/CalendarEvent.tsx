import { motion } from "framer-motion"
import { useContext, useRef } from "react";
import { HomeActionsContext, HomeContext } from "../contexts/HomeContextProvider"
import { calendarEventType } from "../model";


function CalendarEvent({ info, width, padding }: CalendarEventPropsType) {
  let { dragConstraintEl } = useContext(HomeContext);
  let { setAnyItemDragged, setDraggedItemData } = useContext(HomeActionsContext);
  let el = useRef<HTMLDivElement>();

  return (
    <motion.div drag className={`${width} ${padding} mx-auto bg-indigo-600 text-white text-sm rounded shadow 
            cursor-pointer truncate`}
      whileDrag={{ scale: 0.9 }} dragConstraints={dragConstraintEl as React.RefObject<Element>}
      onMouseDown={() => {
        setAnyItemDragged(true);
        setDraggedItemData(info);
      }}
      onTouchStart={() => {
        setAnyItemDragged(true);
        setDraggedItemData(info);
      }}
      ref={el as React.Ref<HTMLDivElement>}
      layoutId={info.id.toString()}
    >
      {info.title}
    </motion.div>
  )
}
type CalendarEventPropsType = {
  info: calendarEventType;
  width: string;
  padding: string;
}
export default CalendarEvent