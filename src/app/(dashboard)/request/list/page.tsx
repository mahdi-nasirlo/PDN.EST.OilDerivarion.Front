"use client";

import React from "react";
import { Card } from "@/components/card";
import useGetCartable from "@/hooks/workflow-request/use-get-cartable";
import WorkflowDataTable from "@/components/workflow/workflow-data-list";
import { ColumnsType } from "antd/lib/table";
import WorkFlowStatusColumn from "@/components/workflow/workflow-status-columns";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd/lib";
import { any } from "zod";
import Breadcrumb from "@/components/breadcrumb";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

const Page = () => {
  const list = useGetCartable();

  const extraColumns: ColumnsType<any> = [
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "5",
      render(_, record) {
        return <WorkFlowStatusColumn record={record} />;
      },
    },
    {
      title: "وضعیت عملیاتی",
      dataIndex: "StatusOperation",
      key: "5",
      render(_, record) {
        let color = "";
        let name = "";
        let icon = <></>;
        if (record.StatusOperation === 0) {
          color = "red";
          name = "نیازمند به ویرایش";
          icon = <CloseCircleOutlined />;
        } else if (record.StatusOperation === 1) {
          color = "success";
          name = "پیش نویس";
          icon = <CheckCircleOutlined />;
        } else if (record.StatusOperation === 2) {
          color = "orange";
          name = "درحال بررسی";
          icon = <CheckCircleOutlined />;
        }

        return (
          <Tag icon={icon} color={color}>
            {name}
          </Tag>
        );
      },
    },

    // {
    //     title: "عملیات",
    //     key: "عملیات",
    //     align: "center",
    //     fixed: "right",
    //     width: "10%",
    //     render: (_, record: any) => (
    //         <Space size="small">
    //             <Link
    //                 className="text-secondary-500 font-bold"
    //                 href={`/workflow/detail/Visit_Schedule/${record.TaskId}`}
    //             >
    //                 مشاهده اطلاعات
    //             </Link>
    //         </Space>
    //     ),
    // },
  ];

  return (
    <>
      <Breadcrumb
        titleIcon={<ClipboardDocumentCheckIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست درخواست ها"}
      />
      <Card>
        <WorkflowDataTable
          loading={list.isFetching}
          data={list.data}
          stepKey="Visit_Schedule"
          extraColumns={extraColumns}
        />
      </Card>
    </>
  );
};

export default Page;
