import { ColumnOrderState, createColumnHelper } from "@tanstack/react-table";
import { userType } from "./model";

export const userTypeDataGridColumnHelper = createColumnHelper<userType>();

export const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

export const slideDownAnimationVariant = {
  initial: {
    opacity: 0,
    y: "-0.5rem",
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};
export const slideUpAnimationVariant = {
  initial: {
    opacity: 0,
    y: "0.5rem",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};
