"use client";

import { Button, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd/lib';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    userDescription: string;
    Tracking: string;
    ConfirmedCode: string;
    status: string;
}


export default function PrimaryExpiredRequestsListTable() {


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام واحد تولیدی",
            dataIndex: "userDescription",
            key: "2",
        },
        {
            title: "محصول تولیدی",
            dataIndex: "Tracking",
            key: "3",
        },
        {
            title: "وضعیت",
            dataIndex: "ConfirmedCode",
            key: "4",
        },
        {
            title: "زمان منقضی شده",
            dataIndex: "status",
            key: "5",
        },
        {
            title: "جزئیات",
            key: "جزئیات",
            align: "center",
            fixed: 'right',
            width: "10%",
            render: (_, record) => (
                <Space size="small">
                    <Button type="link" className="text-primary-500 font-bold" onClick={() => { console.log(record); }}>مشاهده اطلاعات</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-start items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست درخواست های منقضی شده</Typography>
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
        Tracking: "هیدروکربن سبک",
        ConfirmedCode: "در انتظار تایید زمان بازدید",
        status: "1 روز",
    },
    {
        key: "2",
        Row: 2,
        userDescription: "نام شرکت تولیدی تست",
        Tracking: "انواع تینر",
        ConfirmedCode: "در انتظار ارسال به آزمایشگاه",
        status: "1 روز",
    },
];
