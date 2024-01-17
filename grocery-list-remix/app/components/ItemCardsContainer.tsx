import { useRef } from "react";
import {
  Grocery_Item_Status,
  type Grocery_Item,
} from "../utils/models/grocery";
import ItemCard from "./ItemCard";
import { type TextDropItem, useDrop } from "react-aria";

export default function ItemCardsContainer({
  items,
  header,
  onDrop,
  type,
}: {
  items: Array<Grocery_Item>;
  header: React.ReactNode;
  type: Grocery_Item_Status;
  onDrop: (data: {
    name: string;
    status: Grocery_Item_Status;
    newStatus: Grocery_Item_Status;
  }) => void;
}) {
  let ref = useRef(null);
  let { dropProps, isDropTarget } = useDrop({
    ref,
    async onDrop(e) {
      let data = await (
        e.items.find(
          (el) => el.kind === "text" && el.types.has("data"),
        ) as TextDropItem
      )?.getText("data");
      if (data)
        onDrop({
          ...(JSON.parse(data) as {
            name: string;
            status: Grocery_Item_Status;
          }),
          newStatus: type,
        });
    },
  });
  return (
    <div
      className={`flex w-full justify-start rounded border-2 border-dashed lg:justify-end ${
        isDropTarget ? "border-blue-600" : "border-transparent"
      }`}
    >
      <div className={`flex flex-col rounded px-4 py-2`} {...dropProps}>
        {header}
        <div
          className={`relative flex h-64 w-[22rem]  flex-col overflow-y-auto overflow-x-hidden px-3 py-1 pr-7 scrollbar-thin
             scrollbar-track-green-50 scrollbar-thumb-green-500 lg:h-96 lg:w-[26rem] lg:pr-3 
             `}
        >
          {items.map((item, idx) => (
            <div className="mt-4" key={item.name}>
              <ItemCard item={item} idx={idx}></ItemCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
