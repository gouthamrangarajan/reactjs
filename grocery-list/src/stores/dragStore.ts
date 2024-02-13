import { create } from "zustand";
import {
  type Grocery_Item_Status,
  type Grocery_Item,
} from "../data/models/grocery";

interface dragStoreType {
  item?: Grocery_Item;
  setItem: (item: Grocery_Item) => void;
  clearItem: () => void;
  x: number;
  y: number;
  setXY: (data: { x: number; y: number }) => void;
  draggedOverContainerStatus?: Grocery_Item_Status;
  setDraggedOverContainerStatus: (status: Grocery_Item_Status) => void;
  clearDraggedOverContainerStatus: () => void;
}

export const useDragStore = create<dragStoreType>((set) => ({
  item: undefined,
  draggedOverContainerStatus: undefined,
  x: 0,
  y: 0,
  setItem: (new_item: Grocery_Item) => set({ item: new_item }),
  clearItem: () => set({ item: undefined }),
  setXY: ({ x: newX, y: newY }) => set({ x: newX, y: newY }),
  setDraggedOverContainerStatus: (status) =>
    set({ draggedOverContainerStatus: status }),
  clearDraggedOverContainerStatus: () =>
    set({ draggedOverContainerStatus: undefined }),
}));
