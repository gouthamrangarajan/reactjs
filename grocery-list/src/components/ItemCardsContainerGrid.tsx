import { useRef } from "react";
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
  let dragConstraintEl = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative grid flex-shrink-0 grid-cols-1 items-center justify-center gap-3 lg:grid-cols-2"
      ref={dragConstraintEl}
    >
      <ItemCardsContainer
        type={Grocery_Item_Status.TO_BUY}
        items={toBuyItems}
        dragConstraintEl={dragConstraintEl}
        header={
          <span className="pl-5 text-xl font-semibold text-fuchsia-600">
            Item(s) To Buy
          </span>
        }
      ></ItemCardsContainer>
      <ItemCardsContainer
        type={Grocery_Item_Status.BOUGHT}
        items={boughtItems}
        dragConstraintEl={dragConstraintEl}
        header={
          <span className="pl-5 text-xl font-semibold text-red-600">
            Item(s) Bought
          </span>
        }
      ></ItemCardsContainer>
    </div>
  );
}
