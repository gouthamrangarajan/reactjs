import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getExpandedRowModel,
} from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useDataGrid from '../../hooks/useDataGrid';
import { slideDownAnimationVariant, userTypeDataGridColumnHelper as columnHelper } from '../../util/helper';
import { userType } from '../../util/model';
import ColumnChooser from './ColumnChooser';
import Th from './Th';

function Index() {
    let columns = React.useMemo<ColumnDef<userType, string>[]>(
        () => [
            columnHelper.accessor("name", {
                id: "name",
                header: "Name",
                cell: (info) => info.getValue(),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("username", {
                id: "username",
                cell: (info) => info.getValue(),
                header: "User Name",
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("email", {
                id: "email",
                header: "Email",
                cell: (info) => (
                    <a
                        href={`mailto:${info.getValue()}`}
                        className="text-indigo-600 underline"
                    >
                        {info.getValue()}
                    </a>
                ),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("website", {
                id: "website",
                header: "Website",
                cell: (info) => (
                    <a
                        href={`https://www.${info.getValue()}`}
                        target="_blank"
                        className="text-indigo-600 underline"
                    >
                        {info.getValue()}
                    </a>
                ),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("phone", {
                id: "phone",
                header: "Phone",
                cell: (info) => (
                    <>
                        {info
                            .getValue()
                            .split("x")
                            .map((el, ind) =>
                                ind == 0 ? (
                                    <span key={1}>{el}</span>
                                ) : (
                                    <span className="text-sm text-gray-500" key={2}>
                                        x {el}
                                    </span>
                                )
                            )}
                    </>
                ),
                footer: (info) => info.column.id,
            }),
        ],
        []
    );
    let { data, columnOrder, columnVisibility, expanded, setColumnOrder, setColumnVisibility,
        showColumnChooser, setShowColumnChooser, setExpanded } = useDataGrid(columns);
    let table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnOrder,
            columnVisibility,
            expanded,
        },
        onColumnOrderChange: setColumnOrder,
        onColumnVisibilityChange: setColumnVisibility,
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded,
        getRowCanExpand: () => true
    });
    return (
        <DndProvider backend={HTML5Backend}>
            <motion.table className='table-auto w-full' layout>
                <motion.thead className='shadow' layout>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <Th key={header.id} header={header} table={table}
                                ></Th>
                            ))}
                        </tr>
                    ))}
                </motion.thead>
                <motion.tbody className="" layout>
                    {table.getRowModel().rows.map(row => (
                        <Fragment key={row.id}>
                            <motion.tr
                                variants={slideDownAnimationVariant}
                                initial="initial"
                                animate="animate"
                                exit="initial"
                            >
                                {row.getVisibleCells().map((cell, index) => (
                                    <td key={cell.id} className="py-2 px-4 border-collapse border border-slate-200">
                                        <div className='w-full h-full flex items-center'>
                                            {index == 0 && (<button className="p-1 outline-none appearance-none focus:ring-1
                                                focus:ring-indigo-400 transition duration-300 rounded-full mr-1"
                                                onClick={row.getToggleExpandedHandler()}>
                                                {row.getIsExpanded() ?
                                                    <MinusCircleIcon className="w-4 h-4 text-indigo-500"></MinusCircleIcon> :
                                                    <PlusCircleIcon className="w-4 h-4 text-indigo-500"></PlusCircleIcon>
                                                }
                                            </button>)}
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </div>
                                    </td>
                                ))}
                            </motion.tr>
                            <AnimatePresence>
                                {row.getIsExpanded() &&
                                    <motion.tr
                                        variants={slideDownAnimationVariant}
                                        initial="initial"
                                        animate="animate"
                                        exit="initial"
                                    >

                                        <td colSpan={row.getVisibleCells().length}
                                            className="py-2 px-4 border-collapse border border-slate-200">
                                            <div className='w-full flex justify-around text-gray-600 items-center'>
                                                <div className='flex flex-col'>
                                                    <span className="text-gray-700 font-semibold">Address</span>
                                                    <span>{row.original.address.street}, {row.original.address.suit}</span>
                                                    <span>{row.original.address.city}, {row.original.address.zipcode}</span>
                                                </div>
                                                <div className='h-24 w-[2px] bg-gray-300'></div>
                                                <div className='flex flex-col'>
                                                    <span className="text-gray-700 font-semibold">Company</span>
                                                    <span>{row.original.company.name}</span>
                                                    <span>{row.original.company.catchPhrase}</span>
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>}
                            </AnimatePresence>
                        </Fragment>
                    ))}
                    {table.getRowModel().rows.length == 0 && (
                        [1, 2, 3, 4, 5, 7, 8, 9, 10].map(trEl => (
                            <tr key={trEl}>
                                {[1, 2, 3, 4, 5].map(el => (
                                    <td key={el} className="py-2 px-4 border-collapse border border-slate-200 w-1/5">
                                        <div className='h-3 rounded w-full transition duration-300 animate-pulse bg-gray-300'></div>
                                    </td>
                                ))}
                            </tr>)
                        ))
                    }
                </motion.tbody>
                <motion.tfoot className='shadow h-12'>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            <th key="foot" className='py-2 px-4 flex' colSpan={footerGroup.headers.length}>
                                <div className='relative'>
                                    <ColumnChooser display={showColumnChooser} table={table}
                                        closeAction={() => setShowColumnChooser(false)}
                                        position="absolute -top-[13.5rem] -left-2"></ColumnChooser>
                                </div>
                                <button className="appearance-none outline-none py-1 px-3 text-white font-semibold
                                    bg-green-600  focus:ring-2 transition duration-300 rounded
                                    focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                    onClick={() => setShowColumnChooser(chooser => !chooser)}>Choose Columns</button>
                            </th>
                        </tr>
                    ))}
                </motion.tfoot>
            </motion.table>
        </DndProvider>
    )
}

export default Index;