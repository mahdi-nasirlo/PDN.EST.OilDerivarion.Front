"use client"

import {Table, Typography} from "antd";
import Link from "next/link";
import {ColumnsType} from "antd/es/table";

export default function Home() {

    return (
        <>
            <div className="box-border w-full lg:mt-8 lg:p-6 p-2 mt-3">
                <Typography className="mb-5 text-gray-901 font-medium text-xl text-right">
                    صفحات آماده برای تست
                </Typography>
                <Table
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
                />
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

const data1: any[] = [
    {
        Name: "فاکتور های آزمون",
        Link: "/admin-pannel/test-factors",
        Date: "1402/07/03",
        pannel: "ادمین",
    },
    {
        Name: "لیست محصولات",
        Link: "/admin-pannel/products-list",
        Date: "1402/07/04",
        pannel: "ادمین",
    },
    {
        Name: "لیست دسته بندی محصول",
        Link: "/admin-pannel/category-list",
        Date: "1402/07/04",
        pannel: "ادمین",
    },
    {
        Name: "ماده اولیه",
        Link: "/admin-pannel/adding-raw-material",
        Date: "1402/07/04",
        pannel: "ادمین",
    },
    {
        Name: "فاکتور محصول",
        Link: "/admin-pannel/products-factor",
        Date: "1402/07/05",
        pannel: "ادمین",
    },
    {
        Name: "فاکتور ماده اولیه",
        Link: "/admin-pannel/raw-product-factor",
        Date: "1402/07/05",
        pannel: "ادمین",
    },
    {
        Name: "لیست آزمایشگاه",
        Link: "/admin-pannel/laboratory",
        Date: "1402/07/08",
        pannel: "ادمین",
    },
    {
        Name: "استاندارد های آزمون",
        Link: "/admin-pannel/test-feature",
        Date: "1402/07/08",
        pannel: "ادمین",
    },
    {
        Name: "فاکتور های آزمایشگاه",
        Link: "/admin-pannel/labratory-factor",
        Date: "1402/07/08",
        pannel: "ادمین",
    },
    {
        Name: "لیست جعبه ها",
        Link: "/admin-pannel/add-box",
        pannel: "ادمین",
        Date: "1402/07/09"
    }
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
];


const columns: ColumnsType<any> = [
    {
        title: "نام صفحه",
        dataIndex: "Name",
        key: "2",
        render: (_, record) => <><Link href={record?.Link}>{record.Name}</Link></>
    },
    {
        title: "پنل",
        dataIndex: "pannel",
        key: "3",
    },
    {
        title: "تاریخ تحویل",
        dataIndex: "Date",
        key: "4",
    },
];


