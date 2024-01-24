"use client";

import React from "react";
import WorkflowDataTableProvider from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableProvider";
import {
    WorkflowDataTableContextType
} from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableContext";
import { Space } from "antd";
import { apiUrl } from "../../../../../Constants/apiUrl";
import WorkflowDataTable from "../../../../../components/Workflow/WorkflowDataTable";
import WorkFlowStatusColumn from "../../../../../components/Workflow/WorkflowDataTable/WorkFlowStatusColumn";
import VisitInfo from "../../../../../components/Workflow/VisitInfo/visit-info";

export default function Home() {

    const initialValue: WorkflowDataTableContextType = {
        apiUrl: apiUrl.WorkFlowRequest.step03.getAll.url,
        columns: [
            {
                title: "وضعیت",
                dataIndex: "status",
                key: "5",
                render(_, record) { return <WorkFlowStatusColumn record={record} /> }
            },
            {
                title: "عملیات",
                key: "عملیات",
                align: "center",
                fixed: "right",
                width: "10%",
                render: (_, record) => (
                    <Space size="small">
                        <VisitInfo
                            CanEdit={record.CanEdit}
                            href={"/producer/step03/detail/" + record.TaskId}
                        >
                            مشاهده اطلاعات
                        </VisitInfo>
                    </Space>
                ),
            },
        ]
    }

    return (
        <>
            <WorkflowDataTableProvider initialValue={initialValue}>
                <WorkflowDataTable />
            </WorkflowDataTableProvider>
        </>
    );
}