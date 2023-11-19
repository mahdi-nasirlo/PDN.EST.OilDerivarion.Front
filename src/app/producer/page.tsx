"use client";

import {Space, Tag, Tooltip, Typography} from "antd";
import useSWR from "swr";
import Link from "next/link";
import {ColumnsType} from "antd/es/table";
import {listFetcher} from "../../../lib/server/listFetcher";
import {TestGetPage} from "../../../interfaces/test&verify";
import React from "react";
import axios from "axios";
import FormBuilder from "../../../components/FormBuilder";


const fetcher = async () => {

  const res = await axios.post("http://192.168.57.52:1012/CategoryForm/GetData", {
    "group_ID": "31aefbf6-0e08-4044-8132-b3226253054f",
    "groupKey": null,
    "category_ID": "43ed033a-e22d-4ad8-975a-2978db10b6db",
    "category_Key": null
  })

  const result = await res.data

  return result
}

export default function Home() {
  const {
    isLoading,
    data: tests,
    mutate,
  } = useSWR<{ records: TestGetPage[] }>("/TestAndVerify/GetPage", (url) =>
      listFetcher(url, {
        arg: {page: "", fromRecord: 0, selectRecord: 1000},
      })
  );

  const {data, isLoading: loadingForm} = useSWR("/CategoryForm/GetData", fetcher)

  return (
      <>
        <div className="box-border w-full lg:mt-8 lg:p-6 p-2 mt-3">
          <FormBuilder items={data?.data as any} loading={isLoading}/>
        </div>
      </>
  );
}

const columns: ColumnsType<any> = [
  {
    title: "ردیف",
    dataIndex: "Row",
  },
  {
    title: "نام صفحه",
    dataIndex: "Page",
    key: "2",
  },
  {
    title: "آدرس صفحه",
    dataIndex: "Page_URL",
    key: "1",
    render: (_, record) => (
      <Space size="small">
        {record.Page_URL ? (
          <Link href={record.Page_URL} className="text-primary-500 font-bold">
            آدرس صفحه
          </Link>
        ) : (
          <span>آدرس نامعتبر</span>
        )}
      </Space>
    ),
  },
  {
    title: "تستر",
    dataIndex: "Tester",
    key: "3",
  },
  {
    title: "وضعیت تایید از نظر تستر",
    dataIndex: "Test_Success",
    key: "4",
    render: (_, record: any) => {
      let color = "";
      let name = "";
      if (record.Test_Success === 2) {
        color = "green";
        name = "تایید شده";
      } else if (record.Test_Success === 1) {
        color = "red";
        name = "عدم تایید";
      } else {
        color = "yellow";
        name: "در حال بررسی";
      }

      return <Tag color={color}>{name}</Tag>;
    },
  },
  {
    title: "توضیحات تستر",
    dataIndex: "Test_Comment",
    key: "5",
    render: (_, record) => (
      <Tooltip
        placement="top"
        title={<Typography>{record.Test_Comment}</Typography>}
      >
        <Typography.Text
          className=" max-w-[200px]"
          ellipsis={true}
          style={{ width: "40px !important" }}
        >
          {record.Test_Comment}
        </Typography.Text>
      </Tooltip>
    ),
  },
  {
    title: "تاریخ تایید از نطر تستر",
    dataIndex: "Test_Success_Date",
    key: "3",
  },
  {
    title: "فرد تایید کننده",
    dataIndex: "Verifier",
    key: "6",
  },
  {
    title: " وضعیت  تایید از نظر فرد تایید کننده",
    dataIndex: "Verify_Check",
    key: "7",
  },
  {
    title: " توضیحات فرد تایید کننده",
    dataIndex: "Verify_Comment",
    key: "8",
  },

  {
    title: "تاریخ تایید از نظر فرد تایید کننده",
    dataIndex: "Verified_Success_Data",
    key: "9",
  },
  {
    title: "تکنسین",
    dataIndex: "Technician",
    key: "10",
  },
  {
    title: "وضعیت تایید از نظر تکنسین",
    dataIndex: "Technical_Check",
    key: "11",
  },
  {
    title: "توضیحات تکنسین",
    dataIndex: "Technical_Comment",
    key: "12",
  },
  {
    title: "تاریخ تایید از نظر تکنسین",
    dataIndex: "Technical_Success_Date",
    key: "13",
  },
];
