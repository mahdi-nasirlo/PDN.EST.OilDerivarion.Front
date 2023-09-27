"use client";

import {Button, Col, Form, Input, Modal, Row, Select, Space, Table, Typography} from 'antd'
import {PlusIcon} from '@heroicons/react/24/outline';
import {useForm} from 'antd/es/form/Form';
import {ColumnsType} from 'antd/es/table';
import React, {useState} from 'react'
import ConfirmDeleteModal from '@/components/confirm-delete-modal';
// import {TestItemDetail} from "../../../../../interfaces/testItemDetail";


export default function DataTable({setModalVisible, testItemDetail, ldTestItemDetail}: {
    setModalVisible: any,
    testItemDetail: any[] | undefined,
    ldTestItemDetail: boolean
}) {

    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<any | null>(null);

    const handleDelete = (record: any) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const handleSubmit = () => {

        
    }


    //ادیت
    const [form] = useForm()
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<any | null>(null);

    const handleEdit = (record: any) => {
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


    const columns: ColumnsType<any> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "عنوان",
            dataIndex: "Title",
            key: "2",
        },
        {
            title: "عنوان استاندارد",
            dataIndex: "TestItemName",
            key: "3",
        },
        {
            title: "مرجع",
            dataIndex: "ReferenceCode",
            key: "4",
        },
        {
            title: "عملیات",
            key: "عملیات",
            render: (_, record: any) => (
                <Space size="middle">
                    <Button type="link" className="text-secondary-500 font-bold" onClick={() => handleEdit(record)}>ویرایش</Button>
                    <Button type="link" className="text-red-500 font-bold" onClick={() => handleDelete(record)}>حذف</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-between items-center">
                    <Typography className="text-right text-[16px] font-normal">لیست ویژگی های آزمون</Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        onClick={() => setModalVisible(true)}
                    >
                        <PlusIcon width={24} height={24}/>
                        <span className="flex">
                            افزودن ویژگی آزمون
                        </span>
                    </Button>
                </div>
                <Table
                    className="mt-6"
                    loading={ldTestItemDetail}
                    columns={columns}
                    dataSource={testItemDetail}
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
            <ConfirmDeleteModal open={isDeleteModalVisible} setOpen={setIsDeleteModalVisible}
                                handleDelete={handleSubmit} title="ویژگی آزمون"/>
            {/* ویرایش */}
            <Modal
                width={800}
                title="ویژگی آزمون"
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
                <Form name="form_item_path" layout="vertical">
                    <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="عنوان فاکتور">
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="عنوان استاندارد">
                                <Select size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="مرجع">
                                <Select size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}
