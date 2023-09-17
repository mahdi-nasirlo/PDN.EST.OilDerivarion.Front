"use client"

import {PlusIcon} from '@heroicons/react/24/outline'
import {Button, Col, Form, Input, Modal, Row, Table, Typography} from 'antd'
import {useForm} from 'antd/es/form/Form';
import {ColumnsType} from 'antd/es/table';
import React, {useState} from 'react'
import {TableColumnsType} from "antd/lib";


interface DataType {
    key: string;
    Row: number;
    factorsName: string;
}

export default function PrimaryTestFactorsTable({setModalVisible}: { setModalVisible: any }) {


    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<DataType | null>(null);

    const handleDelete = (record: DataType) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        setIsDeleteModalVisible(false);
    };
    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setRecordToDelete(null);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const [form] = useForm()
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<DataType | null>(null);

    const handleEdit = (record: DataType) => {
        setRecordToEdit(record);
        setIsEditModalVisible(true);
    };
    const handleConfirmEdit = () => {
        setIsEditModalVisible(false);
    };
    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
        setRecordToEdit(null);
    };


    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام فاکتور",
            dataIndex: "factorsName",
            key: "2",
        },
        {
            title: "جزئیات",
            key: "جزئیات",
            render: (_, record) => (
                <div className={"flex justify-start"}>
                    <Button type="link" className="text-secondary-500 font-bold"
                            onClick={() => handleEdit(record)}>ویرایش</Button>
                    <Button type="link" className={"text-red-500 font-bold"}
                            onClick={() => handleDelete(record)}>حذف</Button>
                </div>
            ),
        },
    ];

    interface ExpandedDataType {
        key: React.Key;
        date: string;
        name: string;
        upgradeNum: string;
    }

    const expandedRowRender = () => {
        const columns: TableColumnsType<ExpandedDataType> = [
            {title: '#', dataIndex: '1', key: 'date'},
            {title: 'نام ماده اولیه', dataIndex: '1', key: 'name'},
            {title: 'عملیات', dataIndex: '2', key: 'upgradeNum'},
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={[]} pagination={false}/>;
    };


    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-between items-center">
                    <Typography className="text-right text-[16px] font-normal">لیست تولید کننده ها</Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                    >
                        <span className="flex  ">
                            افزودن محصول
                        </span>
                        <PlusIcon width={24} height={24} />
                    </Button>
                </div>
                <Table
                    className="mt-4"
                    columns={columns}
                    expandable={{expandedRowRender: expandedRowRender}}
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
            <Modal
                width={600}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-red-500"
                                type="primary"
                                onClick={handleConfirmDelete}
                                key={"submit"} >
                                حذف
                            </Button >
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleConfirmDelete}
                                key={"cancel"} >
                                انصراف
                            </Button >
                        </Col>
                    </Row>
                ]}
                title="حذف فاکتور"
                visible={isDeleteModalVisible}
                onCancel={handleCancelDelete}
            >
                <p>آیا از حذف این فاکتور مطمئن هستید؟</p>
            </Modal>

            <Modal
                width={600}
                title="ویرایش فاکتور"
                visible={isEditModalVisible}
                onOk={handleConfirmEdit}
                onCancel={handleCancelEdit}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={handleConfirmEdit}
                                key={"submit"} >
                                ثبت
                            </Button >
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleCancelEdit}
                                key={"cancel"} >
                                انصراف
                            </Button >
                        </Col>
                    </Row>
                ]}
            >
                <Form form={form}>
                    <Row gutter={[32, 1]}>
                        <Col xs={24} md={24}>
                            <Form.Item
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                name="year"
                                label="نام فاکتور"
                            >
                                <Input size="large" placeholder="وارد کنید"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}


const data: DataType[] = [
    {
        key: "1",
        Row: 1,
        factorsName: "امیرحسام",
    },
    {
        key: "2",
        Row: 2,
        factorsName: "امیرحسام",
    },
];
