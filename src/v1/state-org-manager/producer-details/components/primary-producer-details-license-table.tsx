"use client";


import { Divider, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    Name: string;
    StartDate: string;
    Date: string;
}


export default function PrimaryProducerDetailsLicenseTable() {

    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام مجوز",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "تاریخ صدور",
            dataIndex: "StartDate",
            key: "3",
        },
        {
            title: "تاریخ اعتبار",
            dataIndex: "Date",
            key: "4",
        }
    ];



    return (
        <>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                اطلاعات مجوز
            </Typography>
            <Table
                className="mt-6"
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <Divider />
        </>
    )
}


const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        Name: "ارائه دهنده مجوز",
        StartDate: "1400/01/01",
        Date: "1405/01/01",
    }
];