"use client";

import { Button, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    Name: string;
    Tracking: string;
    ConfirmedCode: string;
    status: string;
}


export default function PrimaryListRequestsTable() {

    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام واحد تولیدی",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "محصول تولیدی",
            dataIndex: "Tracking",
            key: "3",
        },
        {
            title: "کد رهگیری",
            dataIndex: "ConfirmedCode",
            key: "4",
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "5",
        },
        {
            title: "جزئیات",
            key: "جزئیات",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" className="text-primary-500 font-bold" onClick={() => { console.log(record); }}>مشاهده</Button>
                </Space>
            ),
        },
    ];


    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-start items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست درخواست ها</Typography>
                </div>
                <Table
                    className="mt-6"
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
        Name: "نام شرکت تولیدی تست",
        Tracking: "هیدروکربن سبک",
        ConfirmedCode: "دارد",
        status: "در انتظار تایید زمان بازدید"
    },
    {
        key: "2",
        Row: 2,
        Name: "نام شرکت تولیدی تست",
        Tracking: "انواع تینر",
        ConfirmedCode: "ندارد",
        status: "در انتظار گزارش کارشناس"
    },
];