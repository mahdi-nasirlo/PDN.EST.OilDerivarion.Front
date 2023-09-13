"use client";


import {Divider, Table, Typography} from 'antd';
import React from 'react'


interface DataType {
    key: string;
    Row: number;
    name: string;
    TrackingCode: string;
    ConfirmedRequestCode: string;
    DateRegistration: string;
    ActivityStatus: string[];
    MaterialName: string
}

export default function PrimaryRequestsFromulacionTable() {

    const columns: any = [
        {
            title: 'ردیف',
            width: 100,
            dataIndex: 'Index',
            key: 'Index',
        },
        {
            title: 'نام مواد',
            width: 100,
            dataIndex: 'MaterialName',
            key: 'MaterialName',
        },
        {
            title: 'میزان مصرف برای یک واحد',
            dataIndex: 'MaterialUnitConsumption',
            key: 'MaterialUnitConsumption',
            width: 150,
        },
        {
            title: 'درصد',
            dataIndex: 'MaterialUsagePercentage',
            key: 'MaterialUsagePercentage',
            width: 150,
        },
        {
            title: 'میزان مصرف',
            dataIndex: 'MaterialTotalConsumption',
            key: 'MaterialTotalConsumption',
            width: 150,
        },
        {
            title: "منابع عمده تامین",
            children: [
                {
                    title: "درصد تامین خارجی",
                    dataIndex: "MaterialInternalSupplyPercentage",
                    key: 'MaterialInternalSupplyPercentage',
                    align: "center",
                },
                {
                    title: "درصد تامین داخلی",
                    dataIndex: "MaterialInternalSupplyPercentage",
                    key: 'MaterialInternalSupplyPercentage',
                    align: "center",
                },
            ],
        }
    ]


    return (
        <>
            <Divider/>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                فرمولاسیون مواد اولیه
            </Typography>
            <Table
                className="mt-8"
                columns={columns}
                dataSource={data}
                pagination={false}

            />
            {/*<PrimaryRequestsFinalProductForm/>*/}
        </>
    )
}


const data: DataType[] = [
    {
        key: "1",
        ConfirmedRequestCode: "fhsdhfksjhfkdshfs",
        Row: 1,
        name: "نفتا",
        TrackingCode: "02462556215",
        MaterialName: "امیرحسام خالویی",
        DateRegistration: "1400/01/01",
        ActivityStatus: ["1400/01/01", " ", "08:00"],
    },
    {
        key: "2",
        Row: 2,
        name: "بنزین پیرولیز",
        ConfirmedRequestCode: "fhsdhfksjhfkdshfs",
        TrackingCode: "02462556215",
        MaterialName: "امیرحسام خالویی",
        DateRegistration: "1400/01/01",
        ActivityStatus: ["1400/01/01", " ", "11:00"],
    },
];