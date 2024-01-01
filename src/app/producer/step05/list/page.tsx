"use client"

import React from 'react';
import WorkflowDataTableProvider from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableProvider";
import WorkflowDataTable from "../../../../../components/Workflow/WorkflowDataTable";
import Link from 'next/link';
import {
    WorkflowDataTableContextType
} from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableContext";
import { Button, Space } from "antd";
import { apiUrl } from "../../../../../Constants/apiUrl";

const getDetailPageUrl = "/producer/step05/detail/"

const Page = () => {

    const workflowInitialValue: WorkflowDataTableContextType = {
        apiUrl: apiUrl.WorkFlowRequest.step05.getAll.url,
        columns: [
            {
                title: "ردیف",
                dataIndex: "Row",
                key: "1",
                width: "5%",
            },
            {
                title: "توضیحات کاربر",
                dataIndex: "userDescription",
                key: "2",
            },
            {
                title: "تاریخ شروع",
                dataIndex: "startTimePersian",
                key: "7",
            },
            {
                title: "تاریخ پایان",
                dataIndex: "currentStepStartTimePersian",
                key: "3",
            },
            {
                title: "عملیات",
                key: "عملیات",
                align: "center",
                fixed: "right",
                width: "10%",
                render: (_, record) => (
                    <Space size="small">
                        <Button
                            type="link"
                            className="text-secondary-500 font-bold"
                        >
                            <Link href={getDetailPageUrl + record.taskId}>
                                مشاهده اطلاعات
                            </Link>
                        </Button>
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