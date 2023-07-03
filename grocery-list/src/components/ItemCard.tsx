import { Grocery_Item_Status, type Grocery_Item } from "../data/models/grocery";
import MinusCircleIcon from "@heroicons/react/24/solid/MinusCircleIcon";
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon";
import { useFetcher } from "react-router-dom";
import TimeAgo from "react-timeago";
import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import {
  slideLeftChildrenVariants,
  slideRightChildrenVariants,
} from "../data/animation";

const ItemCard = ({ item, idx }: { item: Grocery_Item; idx: number }) => {
  const fetcher = useFetcher();
  const timeAgoLabelText =
    item.status == Grocery_Item_Status.TO_BUY ? "Added" : "Bought";

  return (
    <motion.div
      layout="position"
      variants={
        item.status == Grocery_Item_Status.TO_BUY
          ? slideRightChildrenVariants
          : slideLeftChildrenVariants
      }
      initial="initial"
      animate="animate"
    >
      <Draggable
        draggableId={`draggable_${item.name}_${item.status}`}
        index={idx}
      >
        {(provided, snapshot) => (
          <div
            className="flex w-[19rem] cursor-grab items-stretch gap-3 rounded-lg bg-white px-4 py-2 shadow lg:w-96"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <fetcher.Form
              action={`/?name=${item.name}&status=${item.status}`}
              method="POST"
              className="flex flex-1 flex-col items-start gap-2"
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-lg font-semibold text-gray-600 underline underline-offset-[6px]">
                  {item.name}
                </span>
                <button
                  className="cursor-pointer appearance-none rounded-full p-1 text-gray-600 outline-none transition-all duration-300 hover:opacity-90 focus:ring-1 focus:ring-gray-600"
                  name="action"
                  value="remove"
                >
                  <MinusCircleIcon className="h-5 w-5"></MinusCircleIcon>
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
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
                    className="cursor-pointer appearance-none rounded-full p-1 text-gray-600 outline-none transition-all duration-300 hover:opacity-90 focus:ring-1 focus:ring-gray-600"
                    name="action"
                    value="move"
                  >
                    <PaperAirplaneIcon className="h-5 w-5"></PaperAirplaneIcon>
                  </button>
                )}
              </div>
            </fetcher.Form>
          </div>
        )}
      </Draggable>
    </motion.div>
  );
};
export default memo(ItemCard);
