import React, { createContext, useRef } from "react";
import { dayDragItemContextType } from "../../model";

export const DragItemContext = createContext<dayDragItemContextType>({
    dragConstraintEl: null,
});

function DragItemContextProvider({ children }: ContextProviderProps) {
    let containerEl = useRef<HTMLDivElement>();

    return (
        <DragItemContext.Provider value={{
            dragConstraintEl: containerEl as React.Ref<HTMLDivElement>
        }}>
            <div ref={containerEl as React.Ref<HTMLDivElement>} className="w-full">
                {children}
            </div>
        </DragItemContext.Provider>
    )
}

type ContextProviderProps = {
    children: React.ReactNode | React.ReactNode[];
}

export default DragItemContextProvider