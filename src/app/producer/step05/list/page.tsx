"use client"

import React from 'react';
import WorkflowDataTableProvider from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableProvider";
import WorkflowDataTable from "../../../../../components/Workflow/WorkflowDataTable";
import Link from 'next/link';
import {
    WorkflowDataTableContextType
} from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableContext";
import { Button, Space, Tooltip, Typography } from "antd";
import { apiUrl } from "../../../../../Constants/apiUrl";
import WorkFlowStatusColumn from '../../../../../components/Workflow/WorkflowDataTable/WorkFlowStatusColumn';

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
                title: "نام متقاضی",
                dataIndex: "userDescription",
                key: "2",
            },
            {
                title: "نام محصولات",
                dataIndex: "productsName",
                key: "3",
                render: (_, record) => (
                    <Tooltip
                        placement="top"
                        title={<Typography>{record.productsName}</Typography>}
                    >
                        <Typography.Text
                            className=" max-w-[250px]"
                            ellipsis={true}
                            style={{ width: "45px !important" }}
                        >
                            {record.productsName}
                        </Typography.Text>
                    </Tooltip>
                ),
            },
            // {
            //     title: "روش تولید",
            //     dataIndex: "productionMethodName",
            //     key: "4",
            // },
            {
                title: "وضعیت",
                dataIndex: "status",
                key: "5",
                render(_, record) { return <WorkFlowStatusColumn record={record} /> }
            },
            {
                title: "تاریخ ثبت درخواست",
                dataIndex: "startTimePersian",
                key: "5",
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