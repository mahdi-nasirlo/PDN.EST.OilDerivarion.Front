"use client";

import React from "react";
import WorkflowDataTableProvider from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableProvider";
import WorkflowDataTable from "../../../../../components/Workflow/WorkflowDataTable";
import {
  WorkflowDataTableContextType
} from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableContext";
import { apiUrl } from "../../../../../Constants/apiUrl";
import { Button, Space } from "antd";
import Link from "next/link";

export default function Home() {

  const initialData: WorkflowDataTableContextType = {
    apiUrl: apiUrl.WorkFlowRequest.step04.getAll.url,
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
              <Link href={"/producer/step04/detail/" + record.taskId}>
                مشاهده اطلاعات
              </Link>
            </Button>
          </Space>
        ),
      },
    ]
  }

  return (
    <WorkflowDataTableProvider initialValue={initialData}>
      <WorkflowDataTable />
    </WorkflowDataTableProvider>
  );
}
