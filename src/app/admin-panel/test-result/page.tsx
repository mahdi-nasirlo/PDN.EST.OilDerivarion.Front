"use client"


import {Space} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {Table} from 'antd/lib';
import React from 'react'
import {addIndexToData} from '../../../../lib/addIndexToData';
import Link from 'next/link';


interface DataType {
    key: string;
    Row: number;
    Barcode: string;
    status: string;
}


export default function Page() {
    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "بار کد",
            dataIndex: "Barcode",
            key: "2",
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "3",
        },
        {
            title: "عملیات",
            key: "عملیات",
            render: (_, record: any) => (
                <Space size="middle">
                    <Link href={`/admin-panel/test-result-record`} className="text-secondary-500 font-bold">
                        ثبت نتیجه
                    </Link>
                </Space >
            ),
        },
    ];

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <Table
                    className="mt-6"
                    columns={columns}
                    dataSource={addIndexToData(data)}
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
            </div >
        </>
    )
}



const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        Barcode: "235648",
        status: "ثبت شده",
    },
    {
        key: "2",
        Row: 2,
        Barcode: "235648",
        status: "ثبت نشده",
    },
    {
        key: "3",
        Row: 3,
        Barcode: "235648",
        status: "ثبت شده",
    },
    {
        key: "4",
        Row: 4,
        Barcode: "235648",
        status: "ثبت نشده",
    },
];