"use client";


import {Alert, Button, Space, Tag, Typography} from 'antd';
import {ColumnsType} from 'antd/es/table';
import React from 'react'
import CustomeTable from "../../../../../components/CustomeTable";


interface DataType {
    key: string;
    Row: number;
    userDescription: string;
    Tracking: string;
    name: string
    status: string;
    pdn: number;
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
            title: "بار کد",
            dataIndex: "name",
            key: "2",
            width: "25%"
        },
        {
            title: "فاکتورهای آزمون",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "وضعیت",
            dataIndex: "pdn",
            key: "5",
            render(_, record) {
                let color = "";
                let name = "";

                if (record.pdn === 0) {
                    color = "red";
                    name = "بررسی نشده";
                } else if (record.pdn === 1) {
                    color = "success";
                    name = "بررسی شده";
                } else if (record.pdn === 2) {
                    color = "processing";
                    name = "در حال آزمایش";
                } else {
                    color = "warning";
                    name = "درخواست اصلاح";
                }

                return (
                    <Tag color={color}>
                        {name}
                    </Tag>
                );
            }
        },
        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        className="text-secondary-500 font-bold"
                        // onClick={}
                    >
                        ثبت نتیجه
                    </Button>

                </Space>
            ),
        },
    ];


    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <Alert
                    style={{height: 60}}
                    message="کد درخواست: 25648"
                    type="info"
                    className="text-right mb-12"
                />

                <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                    لیست آزمایش ها </Typography>
                <CustomeTable
                    setInitialData={() => {
                    }}
                    isLoading={false}
                    data={data}
                    rowKey={"Row"}
                    columns={columns}

                />
            </div>
        </>
    )
}


const data: any = {
    records: [
        {
            key: "1",
            Row: 1,
            name: "235648",
            Tracking: "نقطه اشتعال باز - نقطه ریزش - دانسیته",
            pdn: 0,
        },
        {
            key: "2",
            Row: 2,
            name: "235648",
            Tracking: "نقطه اشتعال باز - نقطه ریزش - دانسیته",

            pdn: 1,
        },
        {
            key: "3",
            Row: 3,
            name: "235648",
            Tracking: "نقطه اشتعال باز - نقطه ریزش - دانسیته",


            pdn: 2,
        },
        {
            key: "4",
            Row: 4,
            name: "235648 ",
            Tracking: "نقطه اشتعال باز - نقطه ریزش - دانسیته",
            pdn: 3,
        },
    ],
    count: 4
}