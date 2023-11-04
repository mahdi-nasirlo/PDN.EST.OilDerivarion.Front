"use client";


import { Button, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";

interface DataType {
    key: string;
    Row: number;
    ProductName: string;
    TrackingCode: string;
    DateRegistration: string;
    MaterialName: string[];
}

export default function DataTable({ setModalVisible }: { setModalVisible: any }) {


    //   const { data, isLoading } = useSWR<GetPage_ExeManager>(
    //     "/Producer/GetPage_ExeManager",
    //     (url) =>
    //       listFetcher(url, {
    //         arg: {
    //           fromRecord: 0,
    //           selectRecord: 100000,
    //         },
    //       })
    //   );

    // : ColumnsType<DataType>

    const showModal = () => {
        setModalVisible(true);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام واحد تولیدی",
            dataIndex: "ProductName",
            key: "2",
        },
        {
            title: "ارسال کننده درخواست",
            dataIndex: "TrackingCode",
            key: "3",
        },
        {
            title: "زمان بازدید",
            dataIndex: "MaterialName",
            key: "4",
        },
        {
            title: "زمان باقی مانده بازدید",
            dataIndex: "DateRegistration",
            key: "5",
        },
        {
            title: "جزئیات",
            key: "جزئیات",
            align: "center",
            fixed: 'right',
            width: "10%",
            render: () => (
                <Space size="small">
                    <Button type="link" onClick={() => showModal()} className="text-primary-500 font-bold">
                        مشاهده دعوت نامه
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="box-border w-full p-6 mt-8">
            <Typography className="text-right text-[16px] font-normal">
                لیست درخواست های منقضی شده
            </Typography>
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
        </div>
    );
}

const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        ProductName: "نام شرکت تولیدی تست",
        TrackingCode: "امیر خالویی",
        MaterialName: ["1400/01/01", " ", "08:00"],
        DateRegistration: "5 روز",
    },
    {
        key: "2",
        Row: 2,
        ProductName: "نام شرکت تست",
        TrackingCode: "امیرحسام خالویی",
        MaterialName: ["1400/10/24", " ", "09:00"],
        DateRegistration: "8 روز",
    },
];
