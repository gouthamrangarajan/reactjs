import { Grocery_Item_Status, type Grocery_Item } from "../data/models/grocery";
import { motion } from "framer-motion";
import MinusCircleIcon from "@heroicons/react/24/solid/MinusCircleIcon";
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon";
import { useFetcher } from "react-router-dom";
import TimeAgo from "react-timeago";
import { useRef } from "react";
import useDragItemStore from "../stores/useDragItemStore";
import { memo } from "react";
import {
  slideLeftChildrenVariants,
  slideRightChildrenVariants,
} from "../data/animation";

const ItemCard = ({ item }: { item: Grocery_Item }) => {
  const cardEl = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher();
  const timeAgoLabelText =
    item.status == Grocery_Item_Status.TO_BUY ? "Added" : "Bought";
  const setItemBeingDragged = useDragItemStore(
    (state) => state.setItemBeingDragged
  );
  const dragConstraintEl = useDragItemStore((state) => state.dragConstraintEl);
  const draggedItemInToBuySection = useDragItemStore(
    (state) => state.draggedItemInToBuySection
  );
  const draggedItemInBoughtSection = useDragItemStore(
    (state) => state.draggedItemInBoughtSection
  );
  return (
    <motion.div
      layout="position"
      className="shadow rounded-lg py-2 px-4 w-80 lg:w-96 bg-white flex items-stretch gap-3 cursor-grab"
      variants={
        item.status == Grocery_Item_Status.TO_BUY
          ? slideRightChildrenVariants
          : slideLeftChildrenVariants
      }
      drag
      whileDrag={{ position: "fixed", zIndex: 10, cursor: "grabbing" }}
      onDragStart={() => {
        setItemBeingDragged(item);
      }}
      onDragEnd={() => {
        if (
          (draggedItemInBoughtSection &&
            item.status == Grocery_Item_Status.TO_BUY) ||
          (draggedItemInToBuySection &&
            item.status == Grocery_Item_Status.BOUGHT)
        ) {
          fetcher.submit(null, {
            method: "POST",
            action: `/?name=${item.name}&status=${item.status}`,
          });
        }
        setItemBeingDragged(undefined);
      }}
      ref={cardEl}
      dragConstraints={dragConstraintEl?.current ? dragConstraintEl : undefined}
    >
      <fetcher.Form
        action={`/?name=${item.name}&status=${item.status}`}
        method="POST"
        className="flex flex-col items-start gap-2 flex-1"
      >
        <div className="flex justify-between w-full items-center">
          <span className="font-semibold underline underline-offset-[6px] text-lg text-gray-600">
            {item.name}
          </span>
          <button
            className="outline-none appearance-none text-gray-600 p-1 hover:opacity-90 rounded-full focus:ring-1 focus:ring-gray-600 cursor-pointer transition-all duration-300"
            name="remove"
          >
            <MinusCircleIcon className="w-5 h-5"></MinusCircleIcon>
          </button>
        </div>
        <div className="flex gap-3 text-sm text-gray-500 items-center">
          <div>
            <span className="italic">Quantity: </span>
            <span className="font-semibold"> {item.quantity}</span>
          </div>
          <div>
            <span className="italic">{timeAgoLabelText}: </span>
            <span className="font-semibold">
              <TimeAgo
                date={
                  item.status == Grocery_Item_Status.TO_BUY
                    ? item.add_date || ""
                    : item.bought_date || ""
                }
              ></TimeAgo>
            </span>
          </div>
          {item.status == Grocery_Item_Status.TO_BUY && (
            <button
              className="outline-none appearance-none text-gray-600 p-1 hover:opacity-90 rounded-full focus:ring-1 focus:ring-gray-600 cursor-pointer transition-all duration-300"
              name="move"
            >
              <PaperAirplaneIcon className="w-5 h-5"></PaperAirplaneIcon>
            </button>
          )}
        </div>
      </fetcher.Form>
    </motion.div>
  );
};
export default memo(ItemCard);