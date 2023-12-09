"use client";

import { Alert, Space, Table, Tag, Tooltip, Typography } from "antd";
import useSWR from "swr";
import Link from "next/link";
import { ColumnsType } from "antd/es/table";
import { listFetcher } from "../../../lib/server/listFetcher";
import { TestGetPage } from "../../../interfaces/test&verify";
import React from "react";
import axios from "axios";
import { addIndexToData } from "../../../lib/addIndexToData";

const fetcher = async () => {
  const res = await axios.post(
    "http://192.168.57.52:1012/CategoryForm/GetData",
    {
      group_ID: "31aefbf6-0e08-4044-8132-b3226253054f",
      groupKey: null,
      category_ID: "43ed033a-e22d-4ad8-975a-2978db10b6db",
      category_Key: null,
    }
  );

  const result = await res.data;

  return result;
};

export default function Home() {
  const {
    isLoading,
    data: tests,
    mutate,
  } = useSWR<{ records: TestGetPage[] }>("/TestAndVerify/GetPage", (url) =>
    listFetcher(url, {
      arg: { page: "", fromRecord: 0, selectRecord: 1000 },
    })
  );

  const { data, isLoading: loadingForm } = useSWR(
    "/CategoryForm/GetData",
    fetcher
  );

  return (
    <>
      <div className="box-border w-full p-6">
        <Alert
          message="توجه !"
          description="اطلاعات موجود در پنل ادمین، اطلاعات پایه و اصلی است. لطفا از تغییر آن خودداری فرمایید."
          type="warning"
          showIcon
          className="text-right mb-12"
        />
        <Typography className="mb-5 text-gray-901 font-medium text-xl text-right">
          صفحات آماده برای تست
        </Typography>
        <Table
          loading={isLoading}
          dataSource={addIndexToData(tests?.records)}
          columns={columns}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "25"],
            defaultCurrent: 1,
            style: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              margin: "16px 0",
            },
          }}
        />
        <div className="mt-8">
          <Typography className="mb-4 text-right">
            لینک های دسترسی به پنل های مختلف
          </Typography>
          <div className="flex">
            <Typography className="text-1xl">ورود به پنل</Typography>
            <Typography>
              <Link
                className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                href="/manufacturer"
              >
                رییس اجرایی
              </Link>
            </Typography>
          </div>
          <div className="flex">
            <Typography className="text-1xl">ورود به پنل</Typography>
            <Typography>
              <Link
                className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                href="/admin-panel"
              >
                ادمین
              </Link>
            </Typography>
          </div>
          <div className="flex">
            <Typography className="text-1xl">ورود به پنل</Typography>
            <Typography>
              <Link
                className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                href="/state-general-management"
              >
                پنل مدیر کل استان
              </Link>
            </Typography>
          </div>
          <div className="flex">
            <Typography className="text-1xl">ورود به پنل</Typography>
            <Typography>
              <Link
                className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                href="/state-org-manager"
              >
                پنل کارشناس استان
              </Link>
            </Typography>
          </div>
          <div className="flex">
            <Typography className="text-1xl">ورود به پنل</Typography>
            <Typography>
              <Link
                className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                href="/provincial-working-group"
              >
                پنل کار گروه استان
              </Link>
            </Typography>
          </div>
          <div className="flex">
            <Typography className="text-1xl">ورود به پنل</Typography>
            <Typography>
              <Link
                className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                href="/laboratory-panel"
              >
                پنل آزمایشگاه
              </Link>
            </Typography>
          </div>
          <div className="flex">
            <Typography className="text-1xl">ورود به پنل</Typography>
            <Typography>
              <Link
                className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                href="/central-working-group"
              >
                پنل کارگروه مرکزی
              </Link>
            </Typography>
          </div>
        </div>
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
          style={{ width: "80px !important" }}
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
