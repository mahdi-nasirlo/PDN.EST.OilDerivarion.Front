"use client"

import React, {createContext, useContext, useState} from 'react';

export const WorkflowContext = createContext<{ value: any, setValue: (arg: any) => void }>({} as any)

const WorkflowProvider = ({children}: { children: React.ReactNode }) => {

    const [value, setValue] = useState()

    return <WorkflowContext.Provider value={{value: value, setValue}}>
        {children}
    </WorkflowContext.Provider>
};

export const useCheckReportSeen = (uid: string, reports: any[] | undefined) => {

    const {value} = useContext(WorkflowContext)

    return {isSeenReport: (value?.[uid]?.length ?? 0) == reports?.length}

}

export default WorkflowProvider;