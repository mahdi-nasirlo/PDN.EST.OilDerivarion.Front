"use client";

import {PlusIcon} from '@heroicons/react/24/outline'
import {Button, Col, Form, Input, Modal, Row, Select, Space, Switch, Table, Typography} from 'antd'
import {useForm} from 'antd/es/form/Form';
import {ColumnsType} from 'antd/es/table';
import React, {useState} from 'react'
import useSWR from "swr";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {addIndexToData} from "../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";

interface DataType {
    key: string;
    Row: number;
    NameRawMaterial: string;
    UnitMeasurement: string;
    ConfirmedRequestCode: string;
    MaterialCode: string;
    TestInvoice: string;
}

export default function DataTable({setModalVisible}: { setModalVisible: any }) {

    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<Material | null>(null);

    const handleDelete = (record: Material) => {
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
    const [recordToEdit, setRecordToEdit] = useState<Material | null>(null);

    const handleEdit = (record: Material) => {
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


    const {data: material, isLoading: ldMaterial} = useSWR<{
        records: Material[],
        count: number
    }>("/Material/GetPage", url => listFetcher(url, {
        arg: {
            "name": null,
            "is_Active": true,
            "fromRecord": 0,
            "selectRecord": 10000
        }
    }))


    const columns: ColumnsType<Material> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام ماده اولیه",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "واحد اندازه گیری",
            dataIndex: "UnitMeasurement",
            key: "3",
        },
        {
            title: "فعال/غیر فعال",
            dataIndex: "ConfirmedRequestCode",
            key: "4",
            render: (e, record) => <Switch defaultChecked={record.Is_Active}/>,
        },
        {
            title: "کد ماده",
            dataIndex: "MaterialCode",
            key: "5",
        },
        {
            title: "فاکتور آزمون",
            dataIndex: "TestInvoice",
            key: "6",
        },
        {
            title: "عملیات",
            key: "عملیات",
            render: (_, record) => (
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
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست مواد اولیه</Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                    >
                        <PlusIcon width={24} height={24} />
                        <span className="flex">
                            افزودن ماده اولیه
                        </span>
                    </Button>
                </div>
                <Table
                    className="mt-6"
                    loading={ldMaterial}
                    columns={columns}
                    dataSource={addIndexToData(material?.records)}
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
            }} title="مواد اولیه"/>
            {/* ویرایش */}
            <Modal
                width={800}
                title="ویرایش ماده اولیه"
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
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="year-establishment"
                                label="نام ماده اولیه"
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="year-establishment"
                                label="واحد اندازه گیری"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="year-establishment"
                                label="وضعیت"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="year-establishment"
                                label="کد ماده"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="year-establishment"
                                label="فاکتور آزمون "
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