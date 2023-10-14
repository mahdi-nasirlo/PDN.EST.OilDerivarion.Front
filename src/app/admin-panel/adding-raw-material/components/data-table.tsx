"use client";

import {PlusIcon} from '@heroicons/react/24/outline'
import {Button, Col, Form, Modal, Row, Space, Switch, Table, Typography} from 'antd'
import {useForm} from 'antd/es/form/Form';
import {ColumnsType} from 'antd/es/table';
import React, {useEffect, useState} from 'react'
import {addIndexToData} from "../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";
import MaterialForm from "@/app/admin-panel/adding-raw-material/components/material-form";

export default function DataTable({setModalVisible, ldMaterial, material, mutate}: {
    setModalVisible: any,
    ldMaterial: boolean,
    mutate: () => void,
    material: {
        records: Material[],
        count: number
    } | undefined
}) {

    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<Material | null>(null);

    const handleDelete = (record: Material) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const { trigger: deleteMaterial, isMutating: ldDeleteMaterial } = useSWRMutation("/Material/Delete", mutationFetcher)

    const handleConfirmDelete = async () => {

        await deleteMaterial({
            "uid": recordToDelete?.Uid
        })

        await mutate()

        setIsDeleteModalVisible(false);

        setRecordToDelete(null);

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

    const sendEditRequest = async (values: Material) => {

        values.Uid = recordToEdit?.Uid

        await trigger(values)

        await mutate()

        setIsEditModalVisible(false)

        setRecordToEdit(null)
    }

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
        setRecordToEdit(null);
    };

    const { trigger, isMutating, data } = useSWRMutation("/Material/Update", mutationFetcher)


    useEffect(() => {
        form.setFieldsValue(recordToEdit)
    }, [recordToEdit])


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
            title: "فاکتورهای آزمون",
            dataIndex: "TestItems",
            key: "6",
        },
        {
            title: "فعال/غیر فعال",
            dataIndex: "ConfirmedRequestCode",
            key: "4",
            render: (e, record) => <Switch defaultChecked={record.Is_Active} />,
        },
        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Button type="link" className="text-secondary-500 font-bold"
                        onClick={() => handleEdit(record)}>ویرایش</Button>
                    <Button type="link" className="text-red-500 font-bold"
                        onClick={() => handleDelete(record)}>حذف</Button>
                </Space>
            ),
        },
    ];


    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-between items-center">
                    <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>لیست
                        مواد اولیه</Typography>
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
                    loading={ldMaterial || ldDeleteMaterial}
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
            <ConfirmDeleteModal
                open={isDeleteModalVisible}
                setOpen={setIsDeleteModalVisible}
                handleDelete={handleConfirmDelete}
                title="مواد اولیه"
            />
            {/* ویرایش */}
            <Modal
                width={800}
                title="ویرایش ماده اولیه"
                open={isEditModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancelEdit}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                loading={isMutating}
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={() => form.submit()}
                                key={"submit"} >
                                ثبت
                            </Button >
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                loading={isMutating}
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleCancelEdit}
                                key={"cancel"}>
                                انصراف
                            </Button>
                        </Col>
                    </Row>
                ]}
            >
                <Form onFinish={sendEditRequest} disabled={isMutating} form={form} layout='vertical'>
                    <MaterialForm />
                </Form>
            </Modal>
        </>
    )
}
