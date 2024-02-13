import { useEffect, useRef, useState } from "react";
import {
  type Grocery_Item_Status,
  type Grocery_Item,
} from "../data/models/grocery";
import ItemCard from "./ItemCard";
import { useDragStore } from "../stores/dragStore";

export default function ItemCardsContainer({
  items,
  header,
  type,
  dragConstraintEl,
}: {
  items: Array<Grocery_Item>;
  header: React.ReactNode;
  type: Grocery_Item_Status;
  dragConstraintEl: React.RefObject<HTMLElement>;
}) {
  const containerEl = useRef<HTMLDivElement>(null);
  const draggedItemX = useDragStore((store) => store.x);
  const draggedItemY = useDragStore((store) => store.y);
  const setDraggedOverStatus = useDragStore(
    (store) => store.setDraggedOverContainerStatus
  );

  const [isDraggedOver, setIsDraggedOver] = useState(false);
  useEffect(() => {
    if (containerEl.current) {
      let { height, width, top, left } =
        containerEl.current.getBoundingClientRect();
      if (
        draggedItemY >= top &&
        draggedItemY < height + top &&
        draggedItemX >= left &&
        draggedItemX < width + left
      ) {
        setIsDraggedOver(true);
        setDraggedOverStatus(type);
      } else {
        setIsDraggedOver(false);
      }
    }
  }, [draggedItemX, draggedItemY]);
  return (
    <div
      className={`flex w-full justify-start rounded border-2 border-dashed transition-all duration-300 lg:justify-end ${
        isDraggedOver && draggedItemX >= 0 && draggedItemY >= 0
          ? "border-blue-600"
          : "border-transparent"
      }`}
      ref={containerEl}
    >
      <div className={`flex flex-col rounded px-4 py-2`}>
        {header}
        <div
          className={`flex h-64 w-[22rem]  flex-col  overflow-x-hidden px-3 py-1 pr-7 transition-all
             duration-300 scrollbar-thin scrollbar-track-green-50 scrollbar-thumb-green-500 lg:h-96  lg:w-[26rem] lg:pr-3
             ${isDraggedOver ? "overflow-y-hidden" : "overflow-y-auto"}
             `}
        >
          {items.map((item, idx) => (
            <div className="mt-4" key={item.name}>
              <ItemCard
                item={item}
                idx={idx}
                dragConstraintEl={dragConstraintEl}
              ></ItemCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
