import { Switch } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { Table } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion"
import { slideUpAnimationVariant } from "../../util/helper"
import { userType } from "../../util/model";

function ColumnChooser({ display, table, closeAction, position = "absolute top-0 left-0" }: ColumnChooserPropsType) {
    return (
        <AnimatePresence>
            {display &&
                <motion.div className={`${position} rounded-xl py-4 px-6 bg-white shadow font-normal
                        flex flex-col items-start w-64`}
                    variants={slideUpAnimationVariant} initial="initial"
                    animate="animate"
                    exit="initial" >
                    <div className="relative w-full">
                        <button className="absolute -right-4 -top-2 appearance-none outline-none
                            transition duration-300 p-1 focus:ring-1 focus:ring-red-500 rounded-full"
                            onClick={closeAction}>
                            <XIcon className="text-red-600 w-4 h-4"></XIcon>
                        </button>
                    </div>
                    <div className="mt-3 pl-1">
                        {table.getAllLeafColumns().map(column => (
                            <motion.div layout="position" key={column.id}>
                                <Switch.Group>
                                    <div className="flex items-center mt-2 w-full">
                                        <Switch
                                            checked={column.getIsVisible()}
                                            onChange={(ev: boolean) => {
                                                column.toggleVisibility(ev);
                                            }}
                                            className={`${column.getIsVisible() ? 'bg-green-700' : 'bg-green-400'}
                                    relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2
                                     border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                     focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                        >
                                            <span className="sr-only">{column.columnDef.header?.toString()} setting</span>
                                            <span
                                                aria-hidden="true"
                                                className={`${column.getIsVisible() ? 'translate-x-6' : 'translate-x-1'}
                                        pointer-events-none inline-block h-4 w-4 mt-[0.06rem]
                                        transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                            />
                                        </Switch>
                                        <Switch.Label className="ml-4">{column.columnDef.header?.toString()}</Switch.Label>
                                    </div>
                                </Switch.Group>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}
type ColumnChooserPropsType = {
    display: boolean;
    table: Table<userType>;
    closeAction: () => void;
    position?: string;
}
export default ColumnChooser