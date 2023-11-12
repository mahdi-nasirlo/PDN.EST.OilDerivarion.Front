"use client";

import React from "react";
import WorkflowDataTableProvider from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableProvider";
import { WorkflowDataTableContextType } from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableContext";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { apiUrl } from "../../../../../Constants/apiUrl";
import WorkflowDataTable from "../../../../../components/Workflow/WorkflowDataTable";

export default function Home() {
  const router = useRouter();

  const initialValue: WorkflowDataTableContextType = {
    apiUrl: apiUrl.WorkFlowRequest.step07.getAll.url,
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
              className="text-secondary-500 font-bold "
              onClick={() => {
                router.push("/producer/expert-naft/detail/" + record.taskId);
              }}
            >
              مشاهده اطلاعات
            </Button>
          </Space>
        ),
      },
    ],
  };

  return (
    <>
      <WorkflowDataTableProvider initialValue={initialValue}>
        <WorkflowDataTable />
      </WorkflowDataTableProvider>
    </>
  );
}
