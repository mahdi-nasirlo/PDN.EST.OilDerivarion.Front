"use client";

import React from "react";
import { Button, Space, Tag, Typography } from "antd";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";
import { RequestList } from "../../../../../../interfaces/requestDetail";
import CustomeTable from "../../../../../../components/CustomeTable";

export default function DataTable(
  {
    setFilter,
    data,
    isLoading,
    mutate,
  }: {
    setFilter: any;
    data: any;
    isLoading: any
    mutate: any
  }) {

  const router = useRouter();

  const columns: ColumnsType<RequestList> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%"
    },
    {
      title: "نام فرآیند",
      dataIndex: "processDescription",
      key: "2",
    },
    {
      title: "تاریخ درخواست",
      dataIndex: "createDate",
      key: "3",
    },
    {
      title: "وضعیت",
      dataIndex: "isReqDetailCompleted",
      key: "4",
      render(_, record) {
        let color = "";
        let name = "";
        if (record.isReqDetailCompleted === true) {
          color = "success";
          name = "تکمیل شده";
        } else {
          color = "red";
          name = "تکمیل نشده";
        }

        return (
          <Tag color={color}>
            {name}
          </Tag>
        );

      },
    },
    {
      title: "نام شرکت",
      dataIndex: "producerName",
      key: "5",
    },
    {
      title: "روش تولید",
      dataIndex: "productionMethodName",
      key: "6",
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
            className={"text-secondary-500 font-bold"}
            onClick={() => {
              router.push(`/producer/dashboard/request-detail/${record.uid}`);
            }}
          >
            مشاهده اطلاعات
          </Button>
        </Space>
      ),
    },
  ];



  return (
    <div className="box-border w-full p-6 mt-8">
      <Typography className="text-right text-[16px] font-normal">
        لیست درخواست ها
      </Typography>
      <CustomeTable
        columns={columns}
        setInitialData={setFilter}
        isLoading={isLoading}
        data={data}
      />
    </div>
  );
}
