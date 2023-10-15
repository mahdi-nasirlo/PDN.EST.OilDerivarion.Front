"use client";

import ConfirmDeleteModal from '@/components/confirm-delete-modal';
import { Button, Space, Switch, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'


interface DataType {
    key: string;
    Row: number;
    Name: string;
    LastName: string;
    UserName: string;
    NationalCode: string;
    phone: string;
    mail: string;
    password: string;
    test: string;
}


export default function DataTable({ setModalVisible }: { setModalVisible: any }) {

    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<DataType | null>(null);

    const handleDelete = (record: DataType) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        // Perform the delete action here with recordToDelete
        // After successful delete, you can close the modal
        setIsDeleteModalVisible(false);
    };
    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setRecordToDelete(null); // Clear the recordToDelete
    };


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "نام خانوادگی",
            dataIndex: "LastName",
            key: "3",
        },
        {
            title: "کد ملی",
            dataIndex: "NationalCode",
            key: "4",
        },
        {
            title: "شناسه کاربری",
            dataIndex: "UserName",
            key: "5",
        },
        {
            title: "شماره تماس",
            dataIndex: "phone",
            key: "6",
        },
        {
            title: "استان",
            dataIndex: "mail",
            key: "7",
        },
        {
            title: "شهر",
            dataIndex: "password",
            key: "8",
        },
        {
            title: "فعال/غیرفعال",
            dataIndex: "password",
            key: "9",
            render: (e, record) => <Switch defaultChecked />,
        },
        {
            title: "نقش",
            dataIndex: "test",
            key: "10",
        },
        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Button type="link" className={"text-red-500 font-bold"} onClick={() => handleDelete(record)}>حذف</Button>
                </Space >
            ),
        },
    ];
    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-start items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>
                        لیست کاربران
                    </Typography>
                </div>
                <Table
                    dataSource={data || []}
                    className="mt-6"
                    columns={columns}
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
            {/* جذف */}
            <ConfirmDeleteModal
                title="حذف کاربر"
                open={isDeleteModalVisible}
                setOpen={handleCancelDelete}
                handleDelete={handleConfirmDelete}
            />
        </>
    )
}


const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        Name: "امیرحسام",
        LastName: "اخالویی",
        UserName: "Hesam",
        NationalCode: "0642303088",
        phone: "09117276762",
        mail: "Hesam@gmail.com",
        password: "123456",
        test: "-"
    },
    {
        key: "2",
        Row: 2,
        Name: "امیرحسام",
        LastName: "خالویی",
        UserName: "Hesam",
        NationalCode: "0642303088",
        phone: "09117276762",
        mail: "Hesam@gmail.com",
        password: "123456",
        test: "مدیر",
    },
];
