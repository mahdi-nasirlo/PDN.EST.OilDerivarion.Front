"use client";


import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
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


export default function PrimaryRequestsManagerTable() {

    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام و نام خانوادگی",
            dataIndex: "name",
            key: "2",
        },
        {
            title: " شماره ملی / کد اتباع",
            dataIndex: "TrackingCode",
            key: "3",
        },
        {
            title: "تاریخ تولد ",
            dataIndex: "ConfirmedRequestCode",
            key: "4",
        },
        {
            title: "سمت",
            dataIndex: "DateRegistration",
            key: "5",
        },
        {
            title: "شماره تماس ",
            dataIndex: "ActivityStatus",
            key: "6",
        },
        // {
        //     title: "عملیات",
        //     key: "جزئیات",
        //     align: "center",
        //     fixed: 'right',
        //     width: "10%",
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Link href={""} className="action-btn-info">
        //                 مشاهده
        //             </Link>
        //         </Space>
        //     ),
        // },
    ];

    return (
        <>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                اطلاعات اعضای هیئت مدیره و مدیرعامل
            </Typography>
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
            {/*<PrimaryRequestLicenseInfoForm/>*/}
        </>
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