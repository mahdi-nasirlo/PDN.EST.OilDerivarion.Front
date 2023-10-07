"use client"

import { Button, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import { addIndexToData } from '../../../../../lib/addIndexToData';
import ModalRegisterResult from './modal-register-result';

interface DataType {
    key: string;
    Row: number;
    TestDescriptionFeature: string;
    TestMethod: string;
    TestResult: string;
    AcceptableRange: string;
    UnitOfMeasurement: string;
    Renewability: string;
    RenewableUnit: string;
}

export default function DataTable() {

    const [isVisibleEditModal, setIsEditModalVisible] = useState<boolean>(false)
    const [recordToEdit, setRecordToEdit] = useState<DataType | null>(null)

    const handleSubmit = (record: DataType) => {
        setRecordToEdit(record);
        setIsEditModalVisible(true);
    };


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "ویژگی شرح آزمون",
            dataIndex: "TestDescriptionFeature",
            key: "2",
        },
        {
            title: "روش آزمون",
            dataIndex: "TestMethod",
            key: "3",
        },
        {
            title: "نتیجه آزمون",
            dataIndex: "TestResult",
            key: "4",
        },
        {
            title: "حدود قابل قبول",
            dataIndex: "AcceptableRange",
            key: "5",
        },
        {
            title: "واحد اندازه گیری",
            dataIndex: "UnitOfMeasurement",
            key: "6",
        },
        {
            title: "تجدید پذیری",
            dataIndex: "Renewability",
            key: "7",
        },
        {
            title: "واحد تجدید پذیری",
            dataIndex: "RenewableUnit",
            key: "8",
        },
        {
            title: "عملیات",
            key: "عملیات",
            render: (_, record: any) => (
                <Space size="middle">
                    <Button type="link" className="text-primary-500 font-bold" onClick={() => handleSubmit(record)}>
                        ثبت نتیجه
                    </Button>
                </Space >
            ),
        },
    ];


    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-between items-center">
                    <Typography className="text-right text-[16px] font-normal">نتیجه آزمون</Typography>
                </div>
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
            </div>
            <ModalRegisterResult
                recordToEdit={recordToEdit}
                setRecordToEdit={setRecordToEdit}
                isEditModalVisible={isVisibleEditModal}
                setIsEditModalVisible={setIsEditModalVisible}
            />
        </>
    )
}



const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        TestDescriptionFeature: "گوگرد کل",
        TestMethod: "نقطه اشتعال باز",
        TestResult: "+70",
        AcceptableRange: "200-400",
        UnitOfMeasurement: "درجه سلسیوس",
        Renewability: "متن نمونه",
        RenewableUnit: "متن نمونه",
    },
    {
        key: "2",
        Row: 2,
        TestDescriptionFeature: "گوگرد کل",
        TestMethod: "نقطه اشتعال باز",
        TestResult: "+70",
        AcceptableRange: "200-400",
        UnitOfMeasurement: "درجه سلسیوس",
        Renewability: "متن نمونه",
        RenewableUnit: "متن نمونه",
    },
    {
        key: "3",
        Row: 3,
        TestDescriptionFeature: "گوگرد کل",
        TestMethod: "نقطه اشتعال باز",
        TestResult: "+70",
        AcceptableRange: "200-400",
        UnitOfMeasurement: "درجه سلسیوس",
        Renewability: "متن نمونه",
        RenewableUnit: "متن نمونه",
    },

];