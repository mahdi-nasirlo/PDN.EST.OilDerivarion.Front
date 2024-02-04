"use client";

import React from "react";
import { Card } from "@/components/card";
import { ColumnsType } from "antd/es/table";
import { Space } from "antd/lib";
import WorkflowDataTable from "@/components/workflow/workflow-data-list";
import Breadcrumb from "@/components/breadcrumb";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import licenseApi from "constance/license";
import VisitInfo from "@/components/workflow/visit-info";
import WorkFlowStatusColumn from "@/components/workflow/workflow-status-columns";

const apiData = licenseApi.GetRequest.producer;

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
