"use client";


import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    name: string;
    TrackingCode: string;
    ConfirmedRequestCode: string;
    DateRegistration: string;
    ActivityStatus: string[];
}


export default function PrimaryRequestsListTable() {

    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام واحد تولیدی",
            dataIndex: "name",
            key: "2",
        },
        {
            title: " شناسه ملی",
            dataIndex: "TrackingCode",
            key: "3",
        },
        {
            title: "نام مدیرعامل   ",
            dataIndex: "ConfirmedRequestCode",
            key: "4",
        },
        {
            title: "تاریخ ثبت",
            dataIndex: "DateRegistration",
            key: "5",
        },
        {
            title: "زمان بازدید ",
            dataIndex: "ActivityStatus",
            key: "6",
        },
        {
            title: "عملیات",
            key: "جزئیات",
            render: (_, record) => (
                <Space size="middle">
                    <Link href={""} className="action-btn-info">
                        مشاهده
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <Table
            className="mt-8"
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
    )
}

const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        name: "نفتا",
        TrackingCode: "02462556215",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "1400/01/01",
        ActivityStatus: ["1400/01/01", " ", "08:00"],
    },
    {
        key: "2",
        Row: 2,
        name: "بنزین پیرولیز",
        TrackingCode: "02462556215",
        ConfirmedRequestCode: "امیرحسام خالویی",
        DateRegistration: "1400/01/01",
        ActivityStatus: ["1400/01/01", " ", "11:00"],
    },
];