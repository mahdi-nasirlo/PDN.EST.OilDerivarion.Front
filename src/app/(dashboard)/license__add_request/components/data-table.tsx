"use client";

import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { Measure } from "../../../../../interfaces/measures";
import StatusColumn from "@/components/custom-table/StatusColumn";
import CustomeTable from "../../../../components/custom-table";
import useProducerInfo from "./hook/use-producer-info";
import { z } from "zod";
import licenseApi from "constance/license";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";

export default function DataTable() {
  const { list, handleDelete } = useProducerInfo();
  const columns: ColumnsType<z.infer<typeof licenseApi.GetRequestList.Item>> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "نام",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "کدملی",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "نام شرکت",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "شناسه ملی شرکت",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "شناسه کسب وکار",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "نوع مجوز",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "شماره مجوز",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "تاریخ اعتبار",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "استان",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "شهرستان",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "توضیحات بررسی کننده",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "تاریخ بررسی ",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "فعال/غیر فعال",
      dataIndex: "isActive",
      key: "4",
      render: (_, record: any) => <StatusColumn record={record} />,
    },
    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="small">
          if (isActive === 0)
          {
            <Button
              type="link"
              className={"text-red-500 font-bold"}
              onClick={() => {
                handleDelete();
              }}
            >
              حذف
            </Button>
          }
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <CustomeTable
          header={{
            icon: <ViewColumnsIcon />,
            text: "لیست مجوزها",
          }}
          setInitialData={() => {}}
          isLoading={list.isLoading}
          data={list.data}
          columns={columns}
        />
      </div>
    </>
  );
}
