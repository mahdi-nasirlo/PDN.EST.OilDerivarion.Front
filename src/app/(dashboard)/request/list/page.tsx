"use client";

import React from "react";
import { Card } from "@/components/card";
import useGetCartable from "@/hooks/workflow-request/use-get-cartable";
import WorkflowDataTable from "@/components/workflow/workflow-data-list";
import { ColumnsType } from "antd/lib/table";
import WorkFlowStatusColumn from "@/components/workflow/workflow-status-columns";
import Breadcrumb from "@/components/breadcrumb";
import { Space, Typography } from "antd";
import Link from "next/link";
import { FolderIcon } from "@heroicons/react/24/solid";

const Page = () => {

  const list = useGetCartable();

  const extraColumns: ColumnsType<any> = [
    {
      title: "وضعیت",
      dataIndex: "Status",
      key: "5",
      render(_, record) {
        return <WorkFlowStatusColumn record={record} />;
      },
    },
    {
      title: "وضعیت پرداختی",
      dataIndex: "Not_Paid_Count",
      key: "5",
      align: "center",
      width: "10%",
      render(_, record) {
        if (record.Not_Paid_Count >= 1 && record.Not_Paid_Count <= 4) {
          return (
            <Space size="small" >
              <Link
                className="text-CustomizeBlue-500 font-bold"
                href={`list/payment_management/${record.TaskId}`}
              >
                نیاز به پرداخت
              </Link>
            </Space >
          )
        } else {
          return (
            <Space size="small">
              <Typography className="text-gray-400 font-bold">
                عدم نیاز به پرداخت
              </Typography>
            </Space>
          );
        }
      },
    },
    {
      title: "وضعیت عملیاتی",
      dataIndex: "StatusOperation",
      key: "5",
      align: "center",
      fixed: "right",
      width: "10%",
      render(_, record) {
        if (record.StatusOperation === 0) {
          return (
            <Space size="small">
              <Link className="text-secondary-500 font-bold" href={`/request`}>
                پیش نویس
              </Link>
            </Space>
          );
        } else if (record.StatusOperation === 1) {
          return (
            <Space size="small">
              <Link
                className="text-secondary-500 font-bold"
                href={`/request/${record.TaskId}`}
              >
                ویرایش
              </Link>
            </Space>
          );
        } else if (record.StatusOperation === 2) {
          return (
            <Space size="small">
              <Link
                className="text-secondary-500 font-bold"
                href={`/request/TaskId`}
              >
                مشاهده تاریخچه
              </Link>
            </Space>
          )
        }
      },
    },
  ];

  return (
    <>
      <Breadcrumb
        titleIcon={<FolderIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست پکیج درخواست ها"}
        backLink="/request"
      />
      <Card>
        <WorkflowDataTable
          loading={list.isFetching}
          data={list.data}
          extraColumns={extraColumns}
        />
      </Card>
    </>
  );
};

export default Page;
