"use client";

import { Button, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd/lib';
import React from 'react'
import Link from "next/link";


interface DataType {
    key: string;
    Row: number;
    userDescription: string;
    Tracking: string;
    ConfirmedCode: string;
    status: string;
    pdn: string;
    middle: string;
}


export default function DataTable() {


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "شناسه درخواست",
            dataIndex: "userDescription",
            key: "2",
        },
        {
            title: "کد ماده",
            dataIndex: "Tracking",
            key: "3",
        },
        {
            title: "تاریخ درخواست",
            dataIndex: "ConfirmedCode",
            key: "4",
        },
        {
            title: "زمان باقی مانده",
            dataIndex: "status",
            key: "5",
        },
        {
            title: "وضعیت",
            dataIndex: "pdn",
            key: "6",
        },

        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: 'right',
            width: "10%",
            render: (_, record) => (
                <Space size="small">
                    <Button type="link" className="text-primary-500 font-bold">
                        <Link href="/laboratory/accepted-requests/report">
                            ارسال گزارش
                        </Link>
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-start items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست
                        درخواست ها</Typography>
                </div>
                <Table
                    className="mt-6"
                    // loading={isLoading}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        defaultPageSize: 10,
                        defaultCurrent: 1,
                        style: {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            margin: "16px 0",
                        },
                    }}
                />
            </div>
        </>
    )
}


const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        userDescription: "نام شرکت تولیدی تست",
        Tracking: "354",
        ConfirmedCode: "1401/10/10",
        status: "8 روز",
        pdn: "بررسی نشده",
        middle: "8 روز"
    },
    {
        key: "2",
        Row: 2,
        userDescription: "نام شرکت تولیدی تست",
        Tracking: "449",
        ConfirmedCode: "1402/05/10",
        status: "8 روز",
        pdn: "بررسی شده",
        middle: "8 روز"
    },
    {
        key: "3",
        Row: 3,
        userDescription: "امیر احمدی",
        Tracking: "449",
        ConfirmedCode: "1401/08/08",
        status: "8 روز",
        pdn: "در حال بررسی",
        middle: "8 روز"
    },
];