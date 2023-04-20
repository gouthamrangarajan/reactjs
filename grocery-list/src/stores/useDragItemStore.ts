import { RefObject } from "react";
import { create } from "zustand";
import { Grocery_Item } from "../data/models/grocery";
interface dragItemStoreType {
  itemBeingDragged: Grocery_Item | undefined;
  dragConstraintEl: RefObject<Element> | undefined;
  draggedItemInToBuySection: boolean;
  draggedItemInBoughtSection: boolean;
  isAnItemBeingDragged: () => boolean;
  setItemBeingDragged: (item: Grocery_Item | undefined) => void;
  setDragConstraintEl: (el: RefObject<Element>) => void;
  setDraggedItemInToBuySection: (val: boolean) => void;
  setDraggedItemInBoughtSection: (val: boolean) => void;
}
const useDragItemStore = create<dragItemStoreType>((set, get) => ({
  itemBeingDragged: undefined,
  dragConstraintEl: undefined,
  draggedItemInToBuySection: false,
  draggedItemInBoughtSection: false,
  isAnItemBeingDragged: () => (get().itemBeingDragged ? true : false),
  setItemBeingDragged: (item: Grocery_Item | undefined) =>
    set({ itemBeingDragged: item }),
  setDragConstraintEl: (el: RefObject<Element>) =>
    set({ dragConstraintEl: el }),
  setDraggedItemInToBuySection: (val: boolean) =>
    set({ draggedItemInToBuySection: val }),
  setDraggedItemInBoughtSection: (val: boolean) =>
    set({ draggedItemInBoughtSection: val }),
}));

export default useDragItemStore;
