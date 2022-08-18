import {
  ColumnDef,
  ColumnOrderState,
  ExpandedState,
} from "@tanstack/react-table";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { userType } from "../util/model";
import getUserData from "../util/getUserData";

function useDataGrid(
  columns: ColumnDef<userType, string>[]
): useDataGridReturnType {
  let [data, setData] = React.useState<userType[]>([]);

  let [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map((column) => column.id as string) //must start out with populated columnOrder so we can splice
  );
  let [columnVisibility, setColumnVisibility] = React.useState({});
  let [showColumnChooser, setShowColumnChooser] = React.useState(false);
  let [expanded, setExpanded] = React.useState<ExpandedState>({});

  useEffect(() => {
    async function populateData() {
      let dt = await getUserData();
      console.log(dt);
      setData(dt);
    }
    populateData();
  }, []);

  return {
    data,
    columnOrder,
    setColumnOrder,
    columnVisibility,
    setColumnVisibility,
    showColumnChooser,
    setShowColumnChooser,
    expanded,
    setExpanded,
  };
}
type useDataGridReturnType = {
  data: userType[];
  columnOrder: ColumnOrderState;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
  columnVisibility: {};
  setColumnVisibility: Dispatch<SetStateAction<{}>>;
  showColumnChooser: boolean;
  setShowColumnChooser: Dispatch<SetStateAction<boolean>>;
  expanded: ExpandedState;
  setExpanded: Dispatch<SetStateAction<ExpandedState>>;
};
export default useDataGrid;
