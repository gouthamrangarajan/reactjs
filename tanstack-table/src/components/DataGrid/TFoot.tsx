import { HeaderGroup, Table } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { userType } from "../../util/model";
import ColumnChooser from "./ColumnChooser";
import PaginationComp from "./PaginationComp";

function TFoot({
  table,
  showColumnChooser,
  setShowColumnChooser,
}: TFootPropsType) {
  return (
    <motion.tfoot className="shadow h-12 w-full">
      {table.getFooterGroups().map((footerGroup: HeaderGroup<userType>) => (
        <tr key={footerGroup.id}>
          <th key="foot" colSpan={footerGroup.headers.length}>
            <div className="py-2 px-4 flex justify-between items-center w-full">
              <div>
                <div className="relative">
                  <ColumnChooser
                    display={showColumnChooser}
                    table={table}
                    closeAction={() => setShowColumnChooser(false)}
                    position="absolute -bottom-9 -left-2"
                  ></ColumnChooser>
                </div>
                <button
                  className="appearance-none outline-none py-1 px-3 text-white font-semibold
                                bg-green-600  focus:ring-2 transition duration-300 rounded
                                focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  onClick={() => setShowColumnChooser((chooser) => !chooser)}
                >
                  Choose Columns
                </button>
              </div>
              <PaginationComp table={table}></PaginationComp>
            </div>
          </th>
        </tr>
      ))}
    </motion.tfoot>
  );
}
type TFootPropsType = {
  table: Table<userType>;
  showColumnChooser: boolean;
  setShowColumnChooser: Dispatch<SetStateAction<boolean>>;
};
export default TFoot;
