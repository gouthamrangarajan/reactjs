import { Column, flexRender, Header, Table } from "@tanstack/react-table";
import { userType } from "../../util/model";
import { useDrag, useDrop } from 'react-dnd';
import { reorderColumn } from "../../util/helper";
import { DotsVerticalIcon } from "@heroicons/react/solid";

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
                <button className="outline-none appearance-none"
                    ref={dragRef}><DotsVerticalIcon className="w-5 h-5 text-gray-100"></DotsVerticalIcon></button>
            </div>
        </th>
    )
}
type ThPropsType = {
    table: Table<userType>;
    header: Header<userType, unknown>;
}
export default Th