"use client";


import { Divider, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    Name: string;
    Code: string;
    BirthDate: string;
    role: string;
    call: string;
}

export default function PrimaryProducerDetailsCeoTable() {


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام و نام خانوادگی",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "کد ملی / کد اتباع",
            dataIndex: "Code",
            key: "3",
        },
        {
            title: "تاریخ تولد",
            dataIndex: "BirthDate",
            key: "4",
        },
        {
            title: "سمت",
            dataIndex: "role",
            key: "5",
        },
        {
            title: "شماره تماس",
            dataIndex: "call",
            key: "6",
        },
    ];



    return (
        <>

            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                اطلاعات اعضای هیئت مدیره و مدیرعامل
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
        Name: "امیرحسام خالویی",
        Code: "00123456789",
        BirthDate: "1370/01/01",
        role: "مدیرعامل",
        call: "09123456789",
    },
    {
        key: "2",
        Row: 2,
        Name: "امیرحسام خالویی",
        Code: "00123456789",
        BirthDate: "1370/01/01",
        role: "رئیس هیئت مدیره",
        call: "09123456789",
    },
];