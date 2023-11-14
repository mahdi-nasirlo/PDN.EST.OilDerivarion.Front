"use client"

import {ColumnsType} from "antd/es/table";
import React from "react";

export interface WorkflowDataTableContextType {
    apiUrl: string,
    columns: ColumnsType<any>

}

const WorkflowDataTableContext = React.createContext<WorkflowDataTableContextType>({} as any)

export default WorkflowDataTableContext