"use client";

import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd/lib';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    userDescription: string;
    status: string;
    pdn: string[];
}



export default function PrimaryVisitReportsTable() {


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام محصول تولیدی",
            dataIndex: "userDescription",
            key: "2",
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "3",
        },
        {
            title: "زمان بازدید",
            dataIndex: "pdn",
            key: "4",
        },
    ];

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-start items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>
                        گزارشات بازدید
                    </Typography>
                </div>
                <Table
                    className="mt-6"
                    // loading={isLoading}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "50"],
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
        status: "1400/01/01",
        pdn: ["1400/10/24", " ", "09:00"],
    },
    {
        key: "2",
        Row: 2,
        userDescription: "نام شرکت تولیدی تست",
        status: "1400/01/01",
        pdn: ["1400/10/24", " ", "09:00"],
    },
    {
        key: "3",
        Row: 3,
        userDescription: "امیر احمدی",
        status: "1400/01/01",
        pdn: ["1400/10/24", " ", "09:00"],
    },
];