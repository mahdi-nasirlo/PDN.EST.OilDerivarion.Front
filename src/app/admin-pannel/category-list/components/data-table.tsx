"use client";


import { PlusIcon } from '@heroicons/react/24/outline'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Switch, Table, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { Category } from "../../../../../interfaces/category";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";


export default function DataTable({ setModalVisible }: { setModalVisible: any }) {


    const [selectedDensity, setSelectedDensity] = useState('');

    const handleDensityChange = (value: any) => {
        setSelectedDensity(value);
    };


    const { data: category, isLoading: ldCategory } = useSWR<{
        records: Category[],
        count: number
    }>("/ProductCategory/GetPage", (url) => listFetcher(url, {
        arg: {
            "name": null,
            "is_Active": true,
            "fromRecord": 0,
            "selectRecord": 100000
        }
    }))

    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<Category | null>(null);

    const handleDelete = (record: Category) => {
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
    const [recordToEdit, setRecordToEdit] = useState<Category | null>(null);

    const handleEdit = (record: Category) => {
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


    const columns: ColumnsType<Category> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام دسته بندی",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "فعال/غیر فعال ",
            dataIndex: "ConfirmedRequestCode",
            key: "3",
            render: (e, record) => <Switch defaultChecked={record.Is_Active} />,
        },
        {
            title: "روش تولید",
            dataIndex: "MethodProduction",
            key: "4",
        },
        {
            title: "دانسیته",
            dataIndex: "Densite",
            key: "5",
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
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست دسته بندی محصولات</Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        onClick={showModal}
                    >
                        <PlusIcon width={24} height={24} />
                        <span className="flex ">
                            افزودن دسته بندی
                        </span>

                    </Button>
                </div>
                <Table
                    className="mt-6"
                    columns={columns}
                    loading={ldCategory}
                    dataSource={addIndexToData(category?.records)}
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
            <ConfirmDeleteModal open={isDeleteModalVisible} setOpen={setIsDeleteModalVisible} handleDelete={() => {
            }}
                title="دسته بندی" />
            {/* ویرایش */}
            <Modal
                width={800}
                title="ویرایش دسته بندی محصول"
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
                <Form form={form} layout='vertical'>
                    <Row gutter={[32, 1]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="year"
                                label="نام دسته بندی"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="lastName"
                                label="فعال/غیر فعال"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="year"
                                label="روش تولید"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="density" label="دانسیته">
                                <Select size="large" placeholder="انتخاب کنید"
                                    onChange={handleDensityChange}>
                                    <Select.Option value="yes">دارد</Select.Option>
                                    <Select.Option value="no">ندارد</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {selectedDensity === 'yes' && (
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="top"
                                    label="حد بالا دانسیته"
                                >
                                    <Input
                                        size="large"
                                        placeholder="وارد کنید"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="bottom"
                                    label="حد پایین دانسیته"
                                >
                                    <Input
                                        size="large"
                                        placeholder="وارد کنید"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal >
        </>
    )
}


