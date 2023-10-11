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
    pdn: string;
}

export default function PrimaryProducerListTable() {

    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام واحد تولیدی",
            dataIndex: "userDescription",
            key: "2",
        },
        {
            title: "شناسه ملی",
            dataIndex: "Tracking",
            key: "3",
        },
        {
            title: "نام مدیرعامل",
            dataIndex: "ConfirmedCode",
            key: "4",
        },
        {
            title: "نوع مالکیت",
            dataIndex: "status",
            key: "5",
        },
        {
            title: "وضعیت حساب کاربری",
            dataIndex: "pdn",
            key: "5",
        },
        {
            title: "جزئیات",
            key: "جزئیات",
            align: "center",
            fixed: 'right',
            width: 150,
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
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست تولید کننده ها</Typography>
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
        Tracking: "6416811861861",
        ConfirmedCode: "علی امیری",
        status: "خصوصی",
        pdn: "در انتظار بررسی"
    },
    {
        key: "2",
        Row: 2,
        userDescription: "نام شرکت تولیدی تست",
        Tracking: "6416811861861",
        ConfirmedCode: "علی امیری",
        status: "خصوصی",
        pdn: "فعال"
    },
    {
        key: "3",
        Row: 3,
        userDescription: "نام شرکت تولیدی تست",
        Tracking: "6416811861861",
        ConfirmedCode: "علی امیری",
        status: "خصوصی",
        pdn: "غیرفعال"
    },
];