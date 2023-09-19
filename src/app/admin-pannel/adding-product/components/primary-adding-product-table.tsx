"use client";

import { PlusIcon } from '@heroicons/react/24/outline'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Switch, Table, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import useSWR from 'swr';
import { Product } from '../../../../../interfaces/product';
import { listFetcher } from '../../../../../lib/server/listFetcher';
import { addIndexToData } from '../../../../../lib/addIndexToData';



export default function PrimaryAddingProductTable({ setModalVisible }: { setModalVisible: any }) {

    const { data } = useSWR<{ records: Product[], count: number }>("/Product/GetPage", (url) => listFetcher(url, {
        arg: {
            "name": null,
            "is_Active": true,
            "fromRecord": 0,
            "selectRecord": 1000
        }
    }))

    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<Product | null>(null);

    const handleDelete = (record: Product) => {
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

    const showModal = () => {
        setModalVisible(true);
    };


    //ادیت

    const [form] = useForm()
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<Product | null>(null);

    const handleEdit = (record: Product) => {
        setRecordToEdit(record);
        setIsEditModalVisible(true);
    };
    const handleConfirmEdit = () => {
        // Perform the edit action here with recordToEdit
        // After successful edit, you can close the modal
        setIsEditModalVisible(false);
    };
    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
        setRecordToEdit(null); // Clear the recordToEdit
    };


    const columns: ColumnsType<Product> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام محصول",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "نام دسته بندی",
            dataIndex: "TrackingCode",
            key: "3",
        },
        {
            title: "فعال/غیر فعال ",
            dataIndex: "Is_Active",
            key: "4",
            render: (e, record) => <Switch defaultChecked={record.Is_Active} />,
        },
        {
            title: "کد محصول",
            dataIndex: "ConfirmedRequestCode",
            key: "5",
        },
        {
            title: "فاکتور آزمون",
            dataIndex: "ConfirmedRequestCode",
            key: "6",
        },
        {
            title: "عملیات",
            key: "عملیات",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" className="text-secondary-500 font-bold" onClick={() => handleEdit(record)}>ویرایش</Button>
                    <Button type="link" className={"text-red-500 font-bold"} onClick={() => handleDelete(record)}>حذف</Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-between items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست محصولات</Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                    >
                        <PlusIcon width={24} height={24} />
                        <span className="flex gap-2">افزودن محصول جدید</span>
                    </Button>
                </div>
                <Table
                    className="mt-6"
                    columns={columns}
                    dataSource={addIndexToData(data?.records)}
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
                title="حذف محصول"
                visible={isDeleteModalVisible}
                onCancel={handleCancelDelete}
            >
                <p>آیا از حذف این محصول مطمئن هستید؟</p>
            </Modal>
            {/* ویرایش */}
            <Modal
                width={800}
                title="ویرایش محصول"
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
                <Form form={form} >
                    <Row gutter={[32, 1]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="Name"
                                label="نام"
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name=""
                                label="دسته بندی محصول"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[32, 1]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="Is_Active"
                                label="فعال/غیر فعال"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}