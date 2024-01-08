"use client"

import React from 'react';
import WorkflowDataTableProvider from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableProvider";
import WorkflowDataTable from "../../../../../components/Workflow/WorkflowDataTable";
import Link from 'next/link';
import {
    WorkflowDataTableContextType
} from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableContext";
import { Space } from "antd";
import { apiUrl } from "../../../../../Constants/apiUrl";
import WorkFlowStatusColumn from '../../../../../components/Workflow/WorkflowDataTable/WorkFlowStatusColumn';
import VisitInfo from "../../../../../components/Workflow/VisitInfo/visit-info";

const Page = () => {

    const workflowInitialValue: WorkflowDataTableContextType = {
        apiUrl: apiUrl.WorkFlowRequest.step05.getAll.url,
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
                        <VisitInfo CanEdit={record.CanEdit} href={"/producer/step05/detail/" + record.TaskId}>                            مشاهده اطلاعات
                        </VisitInfo>
                    </Space>
                ),
            },
        ]
    }

    return (
        <WorkflowDataTableProvider initialValue={workflowInitialValue}>
            <WorkflowDataTable />
        </WorkflowDataTableProvider>
    );
};

export default Page;