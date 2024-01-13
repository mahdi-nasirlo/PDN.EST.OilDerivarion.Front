"use client";

import React from "react";
import { Button, Space, Tag, Tooltip, Typography } from "antd";
import Link from "next/link";
import { ColumnsType } from "antd/es/table";
import { RequestList } from "../../../../../../interfaces/requestDetail";
import CustomeTable from "../../../../../../components/CustomeTable";

export default function DataTable({
  setFilter,
  data,
  isLoading,
  mutate,
}: {
  setFilter: any;
  data: any;
  isLoading: any;
  mutate: any;
}) {

  const columns: ColumnsType<RequestList> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "شرح فرآیند",
      dataIndex: "processDescription",
      key: "2",
      width: "40%",
      render: (_, record) => (
        <Tooltip
          placement="top"
          title={<Typography>{record.processDescription}</Typography>}
        >
          <Typography.Text
            // className="w-full"
            className=" max-w-xl"
            ellipsis={true}
          >
            {record.processDescription}
          </Typography.Text>
        </Tooltip>
      ),
    },
    {
      title: "تاریخ درخواست",
      dataIndex: "createDate",
      key: "3",
    },
    // {
    //   title: "وضعیت",
    //   dataIndex: "isReqDetailCompleted",
    //   key: "4",
    //   render(_, record) {
    //     let color = "";
    //     let name = "";
    //     if (record.isReqDetailCompleted === true) {
    //       color = "success";
    //       name = "تکمیل شده";
    //     } else {
    //       color = "red";
    //       name = "تکمیل نشده";
    //     }

    //     return <Tag color={color}>{name}</Tag>;
    //   },
    // },
    // {
    //   title: "نام شرکت",
    //   dataIndex: "producerName",
    //   key: "5",
    // },
    {
      title: "وضعیت ",
      dataIndex: "requestMasterStatusName",
      key: "4",
    },
    {
      title: "محصولات ",
      dataIndex: "products",
      key: "5",
    },
    {
      title: "روش تولید",
      dataIndex: "productionMethodName",
      key: "6",
    },
    {
      title: "شماره درخواست",
      dataIndex: "requestNumber",
      key: "7",
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
          >
            <Link href={`/producer/dashboard/request-detail/${record.uid}`}>
              مشاهده اطلاعات
            </Link>
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
