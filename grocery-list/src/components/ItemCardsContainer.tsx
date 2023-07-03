import { Grocery_Item_Status, type Grocery_Item } from "../data/models/grocery";
import ItemCard from "./ItemCard";

export default function ItemCardsContainer({
  items,
  header,
  type,
  droppablePlaceholder,
}: {
  items: Array<Grocery_Item>;
  header: React.ReactNode;
  type: Grocery_Item_Status;
  droppablePlaceholder: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col rounded px-4 py-2`}>
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
        {droppablePlaceholder}
      </div>
    </div>
  );
}
