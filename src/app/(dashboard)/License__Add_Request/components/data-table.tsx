"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { Measure } from "../../../../../interfaces/measures";
import StatusColumn from "@/components/CustomeTable/StatusColumn";
import CustomeTable from "../../../../components/CustomeTable";
import { useQuery } from "@tanstack/react-query";
import fetchWithSession from "@/utils/fetch-with-session";

export default function DataTable() {

  const columns: ColumnsType<Measure> = [
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
          <Button type="link" className={"text-secondary-500 font-bold"}>
            ویرایش
          </Button>
          {/* <Button
            type="link"
            className={"text-red-500 font-bold"}
            onClick={() => handleDelete(record)}
          >
            حذف
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        {/* <CustomeTable
          setInitialData={}
          isLoading={}
          data={}
          columns={columns}
        /> */}
      </div>
    </>
  );
}
