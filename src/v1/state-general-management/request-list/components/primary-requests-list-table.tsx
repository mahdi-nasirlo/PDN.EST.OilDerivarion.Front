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
            width: "5%"
        },
        {
            title: "نام واحد تولیدی",
            dataIndex: "name",
            key: "2",
        },
        {
            title: " شماره ملی",
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
            title: "جزئیات",
            key: "جزئیات",
            align: "center",
            fixed: 'right',
            width: "10%",
            render: (_, record) => (
                <Space size="small">
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