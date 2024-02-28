import { Grocery_Item_Status, type Grocery_Item } from "../data/models/grocery";
import MinusCircleIcon from "@heroicons/react/24/solid/MinusCircleIcon";
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon";
import { useFetcher } from "react-router-dom";
import TimeAgo from "react-timeago";
import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  slideLeftChildrenVariants,
  slideRightChildrenVariants,
} from "../data/animation";
import { useDragStore } from "../stores/dragStore";
import {
  receiveMessage,
  removeReceiveMessage,
  sendMessage,
} from "../hooks/usePartyKit";

const ItemCard = ({
  item,
  idx,
  dragConstraintEl,
}: {
  item: Grocery_Item;
  idx: number;
  dragConstraintEl: React.RefObject<HTMLElement>;
}) => {
  const fetcher = useFetcher();
  const timeAgoLabelText =
    item.status == Grocery_Item_Status.TO_BUY ? "Added" : "Bought";
  const setDraggedItemXY = useDragStore((store) => store.setXY);
  const draggedOverStatus = useDragStore(
    (store) => store.draggedOverContainerStatus
  );
  const setDraggedItem = useDragStore((store) => store.setItem);
  const clearDraggedItem = useDragStore((store) => store.clearItem);
  const cardEl = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  useEffect(() => {
    let callback = async (message: MessageEvent<any>) => {
      let data = message.data;
      try {
        let parsedData = JSON.parse(data);
        let mediaBreakpoint = window.innerWidth > 1023 ? "lg" : "sm";
        if (parsedData.type == "move") {
          if (
            parsedData.y > 0 &&
            parsedData.item.name == item.name &&
            parsedData.item.status == item.status &&
            parsedData.mediaBreakpoint == mediaBreakpoint
          ) {
            setStyle({
              position: "fixed",
              left: parsedData.x + "px",
              top: parsedData.y + "px",
              scale: 0.9,
            });
          } else {
            setStyle({});
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    receiveMessage(callback);
    return () => {
      removeReceiveMessage(callback);
    };
  }, []);
  if ((style as any).top)
    return (
      <div style={style}>
        <div className="flex w-[19rem] cursor-grab items-stretch gap-3 rounded-lg bg-white px-4 py-2 shadow lg:w-96">
          <div className="flex flex-1 flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between">
              <span className="text-lg font-semibold text-gray-600 underline underline-offset-[6px]">
                {item.name}
              </span>
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
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <motion.div
      style={style}
      layout="position"
      variants={
        item.status == Grocery_Item_Status.TO_BUY
          ? slideRightChildrenVariants
          : slideLeftChildrenVariants
      }
      ref={cardEl}
      initial="initial"
      animate="animate"
      drag
      dragConstraints={dragConstraintEl}
      dragElastic={0}
      dragSnapToOrigin={item.status == draggedOverStatus ? true : false}
      whileDrag={{ position: "fixed", scale: 0.9 }}
      onDragStart={(ev) => {
        // let { clientX, clientY } = ev as MouseEvent;
        // if (!clientX || !clientY) {
        //   let { clientX: touchClientX, clientY: touchClientY } = (
        //     ev as TouchEvent
        //   ).touches[0];
        //   clientX = touchClientX;
        //   clientY = touchClientY;
        // }
        // if (cardEl.current) {
        //   cardEl.current.style.top = clientY - 30 + "px";
        //   cardEl.current.style.left = clientX - 30 + "px";
        // }
        setDraggedItem(item);
      }}
      onDragEnd={() => {
        let destinationStatus = draggedOverStatus;
        if (item.status != destinationStatus) {
          fetcher.submit(null, {
            method: "POST",
            action: `/?name=${item.name}&status=${item.status}`,
          });
        }
        setDraggedItemXY({ x: 0, y: 0 });
        clearDraggedItem();
        sendMessage(
          JSON.stringify({
            type: "move",
            item,
            x: 0,
            y: 0,
            mediaBreakpoint: window.innerWidth > 1023 ? "lg" : "sm",
          })
        );
      }}
      onDrag={(ev) => {
        let { clientX, clientY } = ev as MouseEvent;
        if (!clientX || !clientY) {
          let { clientX: touchClientX, clientY: touchClientY } = (
            ev as TouchEvent
          ).touches[0];
          clientX = touchClientX;
          clientY = touchClientY;
        }
        setDraggedItemXY({ x: clientX, y: clientY });
        sendMessage(
          JSON.stringify({
            type: "move",
            item,
            x: clientX,
            y: clientY,
            mediaBreakpoint: window.innerWidth > 1023 ? "lg" : "sm",
          })
        );
      }}
    >
      <div className="flex w-[19rem] cursor-grab items-stretch gap-3 rounded-lg bg-white px-4 py-2 shadow lg:w-96">
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
    </motion.div>
  );
};
export default memo(ItemCard);
