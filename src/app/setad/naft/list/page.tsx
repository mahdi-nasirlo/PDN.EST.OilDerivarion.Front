"use client";

import { useRouter } from "next/navigation";
import { WorkflowDataTableContextType } from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableContext";
import { apiUrl } from "../../../../../Constants/apiUrl";
import { Button, Space } from "antd";
import WorkflowDataTableProvider from "../../../../../components/Workflow/WorkflowDataTable/workflowDataTableProvider";
import WorkflowDataTable from "../../../../../components/Workflow/WorkflowDataTable";
import WorkFlowStatusColumn from "../../../../../components/Workflow/WorkflowDataTable/WorkFlowStatusColumn";
import VisitInfo from "../../../../../components/Workflow/VisitInfo/visit-info";

export default function Page() {
  const router = useRouter();

  const initialValue: WorkflowDataTableContextType = {
    apiUrl: apiUrl.WorkFlowRequest.setad.naft.url,
    columns: [
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
        render: (_, record) => (
          <Space size="small">
            <VisitInfo
              CanEdit={record.CanEdit}
              href={"/producer/step17/detail/" + record.TaskId}
            >
              {" "}
              مشاهده اطلاعات
            </VisitInfo>
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
