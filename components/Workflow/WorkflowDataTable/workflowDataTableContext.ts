"use client"

import {ColumnsType} from "antd/es/table";
import React from "react";

export interface WorkflowDataTableContextType {
    apiUrl: string,
    columns: ColumnsType<{CanEdit: boolean, Status: boolean, TaskId: string}>

}

const WorkflowDataTableContext = React.createContext<WorkflowDataTableContextType>({} as any)

export default WorkflowDataTableContext