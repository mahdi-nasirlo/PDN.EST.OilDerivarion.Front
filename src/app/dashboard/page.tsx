"use client";

import { Button, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import DisplayData from "./components/showData";
interface DataType {
  Name: string;
  Link: string;
  Date: string;
  pannel: string;
}

export default function Home() {
  const data = getData();
  const columns: ColumnsType<DataType> = [
    {
      title: "نام صفحه",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "پنل",
      dataIndex: "pannel",
      key: "3",
    },
    {
      title: "تاریخ درخواست",
      dataIndex: "Date",
      key: "4",
    },
    {
      title: "لینک",
      dataIndex: "Link",
      key: "3",
      render: (_, record) => (
        <>
          <Link href={record.Link}>{record.Link}</Link>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="box-border w-full lg:mt-8 lg:p-6 p-2 mt-3">
        {/* <Table
          dataSource={data1}
          columns={columns}
          pagination={{
            defaultPageSize: 10,

            style: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              margin: "16px 0",
            },
          }}
        /> */}
        ;{/* <DisplayData data={data} /> */}
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
              href="/admin-pannel"
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
              پنل اداره کل استان
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
              href="/laboratory"
            >
              پنل آزمایشگاه
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
}

async function getData() {
  // const cookieStore = cookies()
  // const token = cookieStore.get('accessToken')?.value

  // const res = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/security/getId`, {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": 'application/json',
  //         "Authorization": `Bearer ${token}`
  //     }
  // })

  // if (res.ok) {
  //     return res.json()
  // }

  return null;
}

const data1: DataType[] = [
  // {
  //   Name: "لیست محصول",
  //   Link: "/admin-pannel/products-list",
  //   Date: "1402/07/03",
  //   pannel: "ادمین",
  // },
  // {
  //   Name: "لیست دسته بندی محصول",
  //   Link: "/admin-pannel/category-list",
  //   Date: "1402/07/03",
  //   pannel: "ادمین",
  // },
  // {
  //   Name: "ماده اولیه",
  //   Link: "/admin-pannel/adding-raw-material",
  //   Date: "1402/07/03",
  //   pannel: "ادمین",
  // },
  // {
  //   Name: "استان",
  //   Link: "/admin-pannel/province",
  //   Date: "1402/07/03",
  //   pannel: "ادمین",
  // },
  // {
  //   Name: "لیست کاربران",
  //   Link: "/admin-pannel/management-user",
  //   Date: "1402/07/03",
  //   pannel: "ادمین",
  // },
  // {
  //   Name: "ثبت تغییرات کاربران",
  //   Link: "/admin-pannel/confirm-changes",
  //   Date: "1402/07/03",
  //   pannel: "ادمین",
  // },
  // {
  //   Name: "نقش کاربران",
  //   Link: "/admin-pannel/management-user-role",
  //   Date: "1402/07/03",
  //   pannel: "ادمین",
  // },
  // {
  //   Name: "آزمایشگاه",
  //   Link: "/admin-pannel/laboratory",
  //   Date: "1402/07/03",
  //   pannel: "ادمین",
  // },
  // {
  //   Name: "فاکتورهای آزمون",
  //   Link: "/admin-pannel/test-factors",
  //   Date: "1402/07/03",
  //   pannel: "ادمین",
  // },
  // {
  //   Name: "ویژگی های آزمون",
  //   Link: "/admin-pannel/test-feature",
  //   Date: "1402/07/03",
  //   pannel: "ادمین",
  // },
];
