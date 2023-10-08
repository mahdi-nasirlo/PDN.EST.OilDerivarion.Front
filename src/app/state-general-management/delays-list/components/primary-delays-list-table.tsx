"use client";


import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/InternalTable';

import React from 'react'


interface DataType {
    key: string;
    Row: number;
    LastName: string;
    UserName: string;
    NationalCode: string;
    phone: string;
    mail: string[];
}


export default function PrimaryDelaysListTable() {

    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام واحد تولیدی",
            dataIndex: "LastName",
            key: "2",
        },
        {
            title: "شماره درخواست",
            dataIndex: "UserName",
            key: "3",
        },
        {
            title: "نام نماینده استاندارد",
            dataIndex: "NationalCode",
            key: "4",
        },
        {
            title: "تاریخ ثبت",
            dataIndex: "phone",
            key: "5",
        },
        {
            title: "زمان بازدید",
            dataIndex: "mail",
            key: "6",
        },
    ];


    return (
        <>
            <Table
                dataSource={data}
                className="mt-8"
                columns={columns}
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
        </>
    )
}


const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        LastName: "نام شرکت تولیدی تست",
        UserName: "02462556215",
        NationalCode: "امیرحسام خالویی",
        phone: "1400/01/01",
        mail: ["02462556215", "  ", "08:00"],

    },
    {
        key: "2",
        Row: 2,
        LastName: "نام شرکت تولیدی تست",
        UserName: "02462556215",
        NationalCode: "امیرحسام خالویی",
        phone: "1400/01/01",
        mail: ["02462556215", "  ", "08:00"],
    },
];