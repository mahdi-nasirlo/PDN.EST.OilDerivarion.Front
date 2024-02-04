"use client";

import React from "react";
import { Card } from "@/components/card";
import { ColumnsType } from "antd/es/table";
import WorkFlowStatusColumn from "../../../../components/Workflow/workflow-status-columns";
import { Space } from "antd/lib";
import WorkflowDataTable from "@/components/Workflow/workflow-data-list";
import VisitInfo from "../../../../components/Workflow/visit-info";
import Breadcrumb from "@/components/breadcrumb";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import licenseApi from "constance/license";
import { any, z } from "zod";
import { workflowApi } from "constance/workflow";

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
            href={"license_get_request/" + record.Request_Uid}
          >
            مشاهده اطلاعات
          </VisitInfo>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb
        titleIcon={<ClipboardDocumentListIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"رییس اجرا استان"}
      />

      <Card>
        <WorkflowDataTable
          apiUrl="/License/GetRequestList"
          extraColumns={extraColumns}
        />
      </Card>
    </>
  );
};

export default Page;
