import { useEffect, useRef } from "react";
import useDragItemStore from "../stores/useDragItemStore";
import { type Grocery_Item, Grocery_Item_Status } from "../data/models/grocery";
import ItemCardsContainer from "./ItemCardsContainer";
import { useLoaderData } from "react-router-dom";

export default function ItemCardsContainerGrid() {
  const groceryItems = useLoaderData() as Array<Grocery_Item>;
  const toBuyItems = groceryItems.filter(
    (el) => el.status == Grocery_Item_Status.TO_BUY
  );
  const boughtItems = groceryItems.filter(
    (el) => el.status == Grocery_Item_Status.BOUGHT
  );
  const dragConstraintDiv = useRef<HTMLDivElement>(null);
  const setDragConstraintEl = useDragItemStore(
    (state) => state.setDragConstraintEl
  );
  useEffect(() => {
    if (dragConstraintDiv.current) setDragConstraintEl(dragConstraintDiv);
  }, []);
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-3 justify-center items-center"
      ref={dragConstraintDiv}
    >
      <div className="w-full flex justify-start lg:justify-end">
        <ItemCardsContainer
          type={Grocery_Item_Status.TO_BUY}
          items={toBuyItems}
          header={
            <span className="text-xl text-fuchsia-600 font-semibold pl-5">
              Item(s) To Buy
            </span>
          }
        ></ItemCardsContainer>
      </div>
      <div className="w-full flex justify-start">
        <ItemCardsContainer
          type={Grocery_Item_Status.BOUGHT}
          items={boughtItems}
          header={
            <span className="text-xl text-red-600 font-semibold pl-5">
              Item(s) Bought
            </span>
          }
        ></ItemCardsContainer>
      </div>
    </div>
  );
}
