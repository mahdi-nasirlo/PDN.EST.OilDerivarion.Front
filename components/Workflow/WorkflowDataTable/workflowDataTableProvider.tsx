"use client"

import React from "react";
import WorkflowDataTableContext, {WorkflowDataTableContextType} from "./workflowDataTableContext";

interface PropsType {
    children: React.ReactNode,
    initialValue: WorkflowDataTableContextType
}

const WorkflowDataTableProvider = (props: PropsType) => {
    return <>
        <WorkflowDataTableContext.Provider value={props.initialValue}>
            {props.children}
        </WorkflowDataTableContext.Provider>
    </>
}

export default WorkflowDataTableProvider