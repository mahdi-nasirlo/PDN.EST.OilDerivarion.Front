"use client";

import { Button, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd/lib';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    userDescription: string;
    Description: string;
    Tracking: string;
    ConfirmedCode: string;
    status: string;
}


export default function PrimaryLaboratoryResultsTable() {


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
            dataIndex: "Description",
            key: "3",
        },
        {
            title: "تاریخ درخواست",
            dataIndex: "Tracking",
            key: "4",
        },
        {
            title: "زمان باقی مانده",
            dataIndex: "ConfirmedCode",
            key: "5",
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "6",
        },
        {
            title: "جزئیات",
            key: "جزئیات",
            align: "center",
            fixed: 'right',
            width: "10%",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        className="text-primary-500 font-bold"
                        onClick={() => { console.log(record); }}
                    >
                        مشاهده اطلاعات
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-start items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست نتایج آزمایشگاه</Typography>
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
        userDescription: "1254789",
        Description: "321458",
        Tracking: "1401/08/08",
        ConfirmedCode: "8 روز",
        status: "بررسی شده",
    },
    {
        key: "2",
        Row: 2,
        userDescription: "152862",
        Description: "3446005",
        Tracking: "1401/11/05",
        ConfirmedCode: "5 روز",
        status: "بررسی نشده",
    },
    {
        key: "3",
        Row: 3,
        userDescription: "8756433",
        Description: "876234",
        Tracking: "1402/06/19",
        ConfirmedCode: "5 روز",
        status: "در انتظار تایید",
    },
];
