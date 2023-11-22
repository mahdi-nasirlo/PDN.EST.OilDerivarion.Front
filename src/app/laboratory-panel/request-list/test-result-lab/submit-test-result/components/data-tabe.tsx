"use client";


import { Button, Divider, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import CustomeTable from "../../../../../../../components/CustomeTable";
import DateForm from './date-form';
import ResultModal from './result-modal';


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
    const [modalVisible, setModalVisible] = useState(false);


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "فاکتور آزمون",
            dataIndex: "name",
            key: "2",
            width: "25%"
        },
        {
            title: "روش آزمون",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "مرجع",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "نتیجه آزمون",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "حدود قابل قبول",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "واحد اندازه گیری",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "تجدید پذیری",
            dataIndex: "Tracking",
            key: "2",
        },
        {
            title: "واحد تجدید پذیری",
            dataIndex: "Tracking",
            key: "2",
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
                        onClick={() => {
                            setModalVisible(true)
                        }}
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

                <Typography className="mt-3 mb-6 text-right font-medium text-base">
                    لطفا اطلاعات خواسته شده را با دقت وارد نمایید.</Typography>
                <Divider />


                <DateForm />
                <Divider />
                <Typography className="mt-3 mb-6 text-right font-medium text-base">
                    نتیجه آزمون
                </Typography>
                <CustomeTable
                    setInitialData={() => {
                    }}
                    isLoading={false}
                    data={data}
                    rowKey={"Row"}
                    columns={columns}

                />
                <Button
                    loading={false}
                    size="large"
                    className={"w-full"}
                    type="primary"
                    // onClick={() => form.submit()}
                    key={"submit"}
                >
                    ثبت
                </Button>
                <ResultModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
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