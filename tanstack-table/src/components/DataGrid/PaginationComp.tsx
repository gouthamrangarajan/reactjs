import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Table } from "@tanstack/react-table";
import React, { LegacyRef, useEffect, useRef } from "react";
import { userType } from "../../util/model";

function PaginationComp({table}:PaginationCompPropsType) {
  const inpEl=useRef<HTMLInputElement>();
  useEffect(()=>{
    if(inpEl.current)
      inpEl.current.value="1";
  },[]);
  return (
    <div className="flex space-x-2 items-center font-normal text-gray-700">    
      <div className="flex space-x-2 items-center">
        <span>Go To Page:</span>
        <input type="number" className="w-20 py-1 px-3 appearance-none outline-none
         border border-green-600 rounded transition duration-300 focus:ring-1 focus:ring-green-600
         focus:ring-offset-2 focus:ring-offset-green-50" ref={inpEl as LegacyRef<HTMLInputElement>}
         onKeyUp={(ev:React.KeyboardEvent<HTMLInputElement>)=>{
          if(ev.key=="Enter"){
            let nm=Number(ev.target.value)-1;
            if(nm>-1 && nm<table.getPageCount())
              table.setPageIndex(nm);
          }
         }}></input>
      </div>
      <button className="apperance-none outline-none p-1 rounded bg-green-600 focus:ring-1 
        focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 transition duration-300
        disabled:cursor-not-allowed disabled:bg-green-400" disabled={!table.getCanPreviousPage()}
        onClick={()=>
        {
          table.setPageIndex(table.getState().pagination.pageIndex-1);
          if(inpEl.current)
            inpEl.current.value=(table.getState().pagination.pageIndex).toString();
        }}>
        <ChevronLeftIcon className="w-5 h-5 font-normal text-gray-100"></ChevronLeftIcon>
      </button>
      <button className="apperance-none outline-none p-1 rounded bg-green-600 focus:ring-1 
        focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 transition duration-300
        disabled:cursor-not-allowed disabled:bg-green-400" disabled={!table.getCanNextPage()}
        onClick={()=>{
          table.setPageIndex(table.getState().pagination.pageIndex+1);
          if(inpEl.current)
            inpEl.current.value=(table.getState().pagination.pageIndex+2).toString();
        }}>
        <ChevronRightIcon className="w-5 h-5 font-normal text-gray-100"></ChevronRightIcon>
      </button>      
      <span>
        Showing {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} Pages
      </span>
    </div>
  )
}
type PaginationCompPropsType={
  table:Table<userType>;
}
export default PaginationComp