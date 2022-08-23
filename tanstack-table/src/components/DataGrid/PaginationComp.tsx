import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Table } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import React, { MutableRefObject, useEffect } from "react";
import useCallbackRef from "../../hooks/useCallbackRef";
import { fadeAnimationVariant } from "../../util/helper";
import { userType } from "../../util/model";

function PaginationComp({ table }: PaginationCompPropsType) {
  let { elRef, setElRef } = useCallbackRef(() => {
    let inpEl = elRef as MutableRefObject<HTMLInputElement>;
    if (inpEl.current) inpEl.current.value = "1";
  });

  const pageIndex = table.getState().pagination.pageIndex;

  useEffect(() => {
    let inpEl = elRef as MutableRefObject<HTMLInputElement>;
    if (inpEl.current) inpEl.current.value = (pageIndex + 1).toString();
  }, [pageIndex, elRef]);

  return (
    <AnimatePresence exitBeforeEnter>
      {table.getRowModel().rows.length > 0 && (
        <motion.div
          className="flex space-x-2 items-center font-normal text-gray-700"
          variants={fadeAnimationVariant}
          initial="initial"
          exit="initial"
          animate="animate"
        >
          <div className="flex space-x-2 items-center">
            <span>Go To Page:</span>
            <input
              type="number"
              className="w-20 py-1 px-3 appearance-none outline-none
           border border-green-600 rounded transition duration-300 focus:ring-1 focus:ring-green-600
           focus:ring-offset-2 focus:ring-offset-green-50"
              ref={setElRef as (el: HTMLInputElement) => void}
              onKeyUp={(ev: React.KeyboardEvent<HTMLInputElement>) => {
                if (ev.key == "Enter") {
                  let nm = Number(ev.target.value) - 1;
                  if (nm > -1 && nm < table.getPageCount())
                    table.setPageIndex(nm);
                }
              }}
            ></input>
          </div>
          <button
            className="apperance-none outline-none p-1 rounded bg-green-600 focus:ring-1
          focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 transition duration-300
          disabled:cursor-not-allowed disabled:bg-green-400"
            disabled={!table.getCanPreviousPage()}
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex - 1)
            }
          >
            <ChevronLeftIcon className="w-5 h-5 font-normal text-gray-100"></ChevronLeftIcon>
          </button>
          <button
            className="apperance-none outline-none p-1 rounded bg-green-600 focus:ring-1
          focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 transition duration-300
          disabled:cursor-not-allowed disabled:bg-green-400"
            disabled={!table.getCanNextPage()}
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex + 1)
            }
          >
            <ChevronRightIcon className="w-5 h-5 font-normal text-gray-100"></ChevronRightIcon>
          </button>
          <span>
            Showing {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()} Pages
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
type PaginationCompPropsType = {
  table: Table<userType>;
};
export default PaginationComp;
