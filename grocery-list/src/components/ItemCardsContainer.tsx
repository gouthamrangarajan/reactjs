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
    <div className={`py-2 px-4 rounded flex flex-col`}>
      {header}
      <div
        className={`py-1 px-3 pr-7 lg:pr-3  flex flex-col w-[22rem] lg:w-[26rem] h-64 lg:h-96 overflow-y-auto
             overflow-x-hidden scrollbar-thin scrollbar-track-green-50 scrollbar-thumb-green-500 relative 
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
