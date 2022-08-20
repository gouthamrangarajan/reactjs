import { Column, flexRender, Header, Table } from "@tanstack/react-table";
import { userType } from "../../util/model";
import { useDrag, useDrop } from 'react-dnd';
import { fadeAnimationVariant, reorderColumn } from "../../util/helper";
import { ChevronDownIcon, ChevronUpIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";

function Th({ table, header }: ThPropsType) {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()
    const { column } = header

    const [, dropRef] = useDrop({
        accept: 'column',
        drop: (draggedColumn: Column<userType>) => {
            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                column.id,
                columnOrder
            )
            setColumnOrder(newColumnOrder)
        },
    })

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => column,
        type: 'column',
    })
    return (
        <th
            ref={dropRef}
            colSpan={header.colSpan}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="py-1 px-3 border-collapse border border-slate-200
                                        bg-blue-600 text-left text-white font-semibold cursor-pointer"
        >
            <div ref={previewRef} className="flex items-center justify-between">
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                <div className="flex items-center space-x-1" ref={dragRef}>
                    <motion.button className="outline-none appearance-none" 
                        ><DotsVerticalIcon className="w-5 h-5 text-gray-100"></DotsVerticalIcon></motion.button>
                    <AnimatePresence exitBeforeEnter>
                        {header.column.getIsSorted()?(
                        <motion.button className="outline-none appearance-none" initial="initial" animate="animate"
                            exit="initial" variants={fadeAnimationVariant} onClick={header.column.getToggleSortingHandler()}
                            key={1}>                            
                                <ChevronUpIcon className={`text-gray-100 transition duration-300 w-4 h-4
                                        ${header.column.getIsSorted()=='desc'?'transform rotate-180':""}`}></ChevronUpIcon>
                        </motion.button>):(<motion.button className="flex flex-col" initial="initial" animate="animate"
                        exit="initial"  variants={fadeAnimationVariant} onClick={header.column.getToggleSortingHandler()}
                        key={2}>
                            <ChevronUpIcon className="text-gray-100/70 w-3 h-3"></ChevronUpIcon>
                            <ChevronDownIcon className="text-gray-100/70 w-3 h-3"></ChevronDownIcon>
                        </motion.button>)}
                    </AnimatePresence>
                </div>
            </div>
        </th>
    )
}
type ThPropsType = {
    table: Table<userType>;
    header: Header<userType, unknown>;
}
export default Th