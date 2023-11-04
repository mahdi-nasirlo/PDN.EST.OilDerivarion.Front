"use client";


import { Divider, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    name: string;
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
            title: "نام فاکتور آزمون",
            dataIndex: "name",
            key: "2",
            width: "95%"
        },
    ];



    return (
        <>
            <Divider />
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                فاکتور های آزمون
            </Typography>
            <Table
                className="mt-8"
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </>
    )
}



const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        name: "نام فاکتور آزمون تستی",
    },
    {
        key: "2",
        Row: 2,
        name: "نام فاکتور آزمون تستی",
    },
];