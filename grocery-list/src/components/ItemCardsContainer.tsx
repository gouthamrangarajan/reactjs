import { useEffect, useRef } from "react";
import { Grocery_Item_Status, type Grocery_Item } from "../data/models/grocery";
import useDragItemStore from "../stores/useDragItemStore";
import ItemCard from "./ItemCard";
import { motion } from "framer-motion";
import {
  slideLeftParentVariants,
  slideRightParentVariants,
} from "../data/animation";

export default function ItemCardsContainer({
  items,
  header,
  type,
}: {
  items: Array<Grocery_Item>;
  header: React.ReactNode;
  type: Grocery_Item_Status;
}) {
  const sectionEl = useRef<HTMLDivElement>(null);
  const itemBeingDragged = useDragItemStore((state) => state.itemBeingDragged);
  const draggedItemInToBuySection = useDragItemStore(
    (state) => state.draggedItemInToBuySection
  );
  const draggedItemInBoughtSection = useDragItemStore(
    (state) => state.draggedItemInBoughtSection
  );
  const setDraggedItemInToBuySection = useDragItemStore(
    (state) => state.setDraggedItemInToBuySection
  );
  const setDraggedItemInBoughtSection = useDragItemStore(
    (state) => state.setDraggedItemInBoughtSection
  );
  useEffect(() => {
    function mouseMove(ev: MouseEvent) {
      if (sectionEl.current) {
        const { x, y, width, height } =
          sectionEl.current.getBoundingClientRect();
        if (
          ev.pageX >= x &&
          ev.pageY >= y &&
          ev.pageX <= x + width &&
          ev.pageY <= y + height
        ) {
          if (type == Grocery_Item_Status.TO_BUY)
            setDraggedItemInToBuySection(true);
          else setDraggedItemInBoughtSection(true);
        } else {
          if (type == Grocery_Item_Status.TO_BUY)
            setDraggedItemInToBuySection(false);
          else setDraggedItemInBoughtSection(false);
        }
      }
    }
    function touchMove(ev: TouchEvent) {
      if (sectionEl.current && ev.touches[0]) {
        const { x, y, width, height } =
          sectionEl.current.getBoundingClientRect();
        if (
          ev.touches[0].pageX >= x &&
          ev.touches[0].pageY >= y &&
          ev.touches[0].pageX <= x + width &&
          ev.touches[0].pageY <= y + height
        ) {
          if (type == Grocery_Item_Status.TO_BUY)
            setDraggedItemInToBuySection(true);
          else setDraggedItemInBoughtSection(true);
        } else {
          if (type == Grocery_Item_Status.TO_BUY)
            setDraggedItemInToBuySection(false);
          else setDraggedItemInBoughtSection(false);
        }
      }
    }
    if (itemBeingDragged) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("touchmove", touchMove);
    } else {
      if (type == Grocery_Item_Status.TO_BUY)
        setDraggedItemInToBuySection(false);
      else setDraggedItemInBoughtSection(false);
    }
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
    };
  }, [itemBeingDragged]);
  return (
    <div
      className={`py-2 px-4 border-dashed border-2 rounded flex flex-col ${
        (type == Grocery_Item_Status.TO_BUY && draggedItemInToBuySection) ||
        (type == Grocery_Item_Status.BOUGHT && draggedItemInBoughtSection)
          ? "border-blue-600"
          : "border-transparent"
      }`}
      ref={sectionEl}
    >
      {header}
      <motion.div
        variants={
          type == Grocery_Item_Status.TO_BUY
            ? slideRightParentVariants
            : slideLeftParentVariants
        }
        initial="initial"
        animate="animate"
        className="py-1 px-3 pr-7 lg:pr-3  flex flex-col w-[22rem] lg:w-[26rem] h-64 lg:h-96 overflow-y-auto
             overflow-x-hidden scrollbar-thin scrollbar-track-green-50 scrollbar-thumb-green-500 relative"
      >
        {items.map((item) => (
          <div className="mt-4" key={item.name}>
            <ItemCard item={item}></ItemCard>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
