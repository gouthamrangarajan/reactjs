import { type Grocery_Item, Grocery_Item_Status } from "../data/models/grocery";
import ItemCardsContainer from "./ItemCardsContainer";
import { useFetcher, useLoaderData } from "react-router-dom";
import {
  DragDropContext,
  type DropResult,
  Droppable,
} from "react-beautiful-dnd";

export default function ItemCardsContainerGrid() {
  const fetcher = useFetcher();
  const groceryItems = useLoaderData() as Array<Grocery_Item>;
  const toBuyItems = groceryItems.filter(
    (el) => el.status == Grocery_Item_Status.TO_BUY
  );
  const boughtItems = groceryItems.filter(
    (el) => el.status == Grocery_Item_Status.BOUGHT
  );
  const onDragEnd = (ev: DropResult) => {
    let destinationStatus = parseInt(
      ev.destination?.droppableId.substring("droppable_".length) || "0"
    ) as Grocery_Item_Status;
    let itemName = ev.draggableId.substring(
      "draggable_".length,
      ev.draggableId.indexOf("_", "draggable_".length)
    );
    let itemStatus = parseInt(
      ev.draggableId.replace(`draggable_${itemName}_`, "").trim()
    ) as Grocery_Item_Status;
    if (itemStatus != destinationStatus) {
      fetcher.submit(null, {
        method: "POST",
        action: `/?name=${itemName}&status=${itemStatus}`,
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid flex-shrink-0 grid-cols-1 items-center justify-center gap-3 lg:grid-cols-2">
        <Droppable droppableId={`droppable_${Grocery_Item_Status.TO_BUY}`}>
          {(provided, snapshot) => (
            <div
              className={`flex w-full justify-start rounded border-2 border-dashed lg:justify-end ${
                snapshot.isDraggingOver
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ItemCardsContainer
                type={Grocery_Item_Status.TO_BUY}
                items={toBuyItems}
                header={
                  <span className="pl-5 text-xl font-semibold text-fuchsia-600">
                    Item(s) To Buy
                  </span>
                }
                droppablePlaceholder={provided.placeholder}
              ></ItemCardsContainer>
            </div>
          )}
        </Droppable>
        <Droppable droppableId={`droppable_${Grocery_Item_Status.BOUGHT}`}>
          {(provided, snapshot) => (
            <div
              className={`flex w-full justify-start rounded border-2 border-dashed ${
                snapshot.isDraggingOver
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <ItemCardsContainer
                type={Grocery_Item_Status.BOUGHT}
                items={boughtItems}
                header={
                  <span className="pl-5 text-xl font-semibold text-red-600">
                    Item(s) Bought
                  </span>
                }
                droppablePlaceholder={provided.placeholder}
              ></ItemCardsContainer>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
