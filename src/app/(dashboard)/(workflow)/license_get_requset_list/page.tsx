"use client";

import React from "react";
import { Card } from "@/components/card";
import { ColumnsType } from "antd/es/table";
import WorkFlowStatusColumn from "../../../../components/Workflow/workflow-status-columns";
import { Space } from "antd/lib";
import WorkflowDataTable from "@/components/Workflow/workflow-data-list";
import VisitInfo from "../../../../components/Workflow/visit-info";

const Page = () => {
  const extraColumns: ColumnsType = [
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "5",
      render(_, record) {
        return <WorkFlowStatusColumn record={record} />;
      },
    },

    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record: any) => (
        <Space size="small">
          <VisitInfo
            CanEdit={record.CanEdit}
            href={"/producer/step13/detail/" + record.TaskId}
          >
            مشاهده اطلاعات
          </VisitInfo>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <WorkflowDataTable
        apiUrl="/License/GetRequestList"
        extraColumns={extraColumns}
      />
    </Card>
  );
};

export default Page;
