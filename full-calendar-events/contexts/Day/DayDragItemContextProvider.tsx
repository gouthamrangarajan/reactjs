import React, { createContext, useRef } from "react";
import { dayDragItemContextType } from "../../model";

export const DayDragItemContext = createContext<dayDragItemContextType>({
    dragConstraintEl: null,
});

function DayDragItemContextProvider({ children }: ContextProviderProps) {
    let containerEl = useRef<HTMLDivElement>();

    return (
        <DayDragItemContext.Provider value={{
            dragConstraintEl: containerEl as React.Ref<HTMLDivElement>
        }}>
            <div ref={containerEl as React.Ref<HTMLDivElement>} className="w-full flex-1">
                {children}
            </div>
        </DayDragItemContext.Provider>
    )
}

type ContextProviderProps = {
    children: React.ReactNode | React.ReactNode[];
}

export default DayDragItemContextProvider