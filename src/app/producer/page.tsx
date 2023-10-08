"use client"

import {Alert, Table, Typography} from "antd";
import Link from "next/link";
import {ColumnsType} from "antd/es/table";

export default function Home() {

    return (
        <>
            <div className="box-border w-full lg:mt-8 lg:p-6 p-2 mt-3">
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
                    dataSource={data1}
                    columns={columns}
                    pagination={false}
                />
                <div className="mt-8">
                    <Typography className="mb-4 text-right">لینک های دسترسی به پنل های مختلف</Typography>
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
            </div>
        </>
    );
}

const data1: any[] = [
    {
        Name: "فاکتور های آزمون",
        Link: "/admin-panel/test-factors",
        Date: "1402/07/03",
        pannel: "ادمین",
    },
    {
        Name: "لیست محصولات",
        Link: "/admin-panel/product/products-list",
        Date: "1402/07/04",
        pannel: "ادمین",
    },
    {
        Name: "لیست دسته بندی محصول",
        Link: "/admin-panel/product/category-list",
        Date: "1402/07/04",
        pannel: "ادمین",
    },
    {
        Name: "ماده اولیه",
        Link: "/admin-panel/adding-raw-material",
        Date: "1402/07/04",
        pannel: "ادمین",
    },
    {
        Name: "فاکتور محصول",
        Link: "/admin-panel/product/products-factor",
        Date: "1402/07/05",
        pannel: "ادمین",
    },
    {
        Name: "فاکتور ماده اولیه",
        Link: "/admin-panel/raw-product-factor",
        Date: "1402/07/05",
        pannel: "ادمین",
    },
    {
        Name: "لیست آزمایشگاه",
        Link: "/admin-panel/laboratory",
        Date: "1402/07/08",
        pannel: "ادمین",
    },
    {
        Name: "استاندارد های آزمون",
        Link: "/admin-panel/test-feature",
        Date: "1402/07/08",
        pannel: "ادمین",
    },
    {
        Name: "فاکتور های آزمایشگاه",
        Link: "/admin-panel/labratory-factor",
        Date: "1402/07/08",
        pannel: "ادمین",
    },
    {
        Name: "لیست جعبه ها",
        Link: "/admin-panel/add-box",
        pannel: "ادمین",
        Date: "1402/07/09"
    },
    {
        Name: "صفحه مواد اولیه محصول",
        Link: "/admin-panel/product/row-material-product",
        pannel: "ادمین",
        Date: "1402/07/16"
    },
    // {
    //   Name: "استان",
    //   Link: "/admin-panel/province",
    //   Date: "1402/07/03",
    //   pannel: "ادمین",
    // },
    // {
    //   Name: "لیست کاربران",
    //   Link: "/admin-panel/management-user",
    //   Date: "1402/07/03",
    //   pannel: "ادمین",
    // },
    // {
    //   Name: "ثبت تغییرات کاربران",
    //   Link: "/admin-panel/confirm-changes",
    //   Date: "1402/07/03",
    //   pannel: "ادمین",
    // },
    // {
    //   Name: "نقش کاربران",
    //   Link: "/admin-panel/management-user-role",
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
    {
        title: "فرد تایید کننده",
        dataIndex: "approving-person",
        key: "5"
    },
    {
        title: "تاریخ تایید",
        dataIndex: "approving-date",
        key: "6"
    },
    {
        title: "توضیحات",
        dataIndex: "desc",
        key: "7"
    }
];


