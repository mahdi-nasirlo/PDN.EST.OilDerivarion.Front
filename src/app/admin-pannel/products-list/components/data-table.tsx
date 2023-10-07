"use client";

import { PlusIcon } from '@heroicons/react/24/outline'
import { Button, Col, Form, Modal, Row, Space, Switch, Table, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { Product } from '../../../../../interfaces/product';
import { listFetcher } from '../../../../../lib/server/listFetcher';
import { addIndexToData } from '../../../../../lib/addIndexToData';
import ProductForm from "@/app/admin-pannel/products-list/components/product-form";
import { convertKeysToLowerCase } from "../../../../../lib/convertKeysToLowerCase";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";


export default function DataTable({ setModalVisible, ldProduct, product, mutate }: {
    setModalVisible: any,
    ldProduct: boolean,
    mutate: () => void,
    product: {
        records: Product[],
        count: number
    } | undefined
}) {


    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<Product | null>(null);

    const handleDelete = (record: Product) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const { trigger: deleteProduct } = useSWRMutation("/Product/Delete", mutationFetcher)

    const handleConfirmDelete = async () => {

        await deleteProduct({
            uid: recordToDelete?.Uid
        })

        setIsDeleteModalVisible(false);

        await mutate()

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

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
        setRecordToEdit(null); // Clear the recordToEdit
    };


    useEffect(() => {

        form.setFieldsValue(convertKeysToLowerCase(recordToEdit))

    }, [recordToEdit])


    const {
        data: defaultCategory,
        isLoading: ISLdDefaultCategory
    } = useSWR<Product | null>(recordToEdit ? "/Product/Get" : null, (url: string) => listFetcher(url, {
        arg: {
            "uid": recordToEdit?.Uid
        }
    }))


    useEffect(() => {

        form.setFieldValue("productCategory_Id", recordToEdit?.ProductCategory_Id)

    }, [defaultCategory])

    const { trigger, isMutating } = useSWRMutation("/Product/Update", mutationFetcher)

    const updateProduct = async (values: Product) => {

        values.Uid = recordToEdit?.Uid

        await trigger(values)

        await mutate()

        setIsEditModalVisible(false)

    }


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
            dataIndex: "ProductCategoryName",
            key: "3",
        },
        {
            title: "فعال/غیر فعال ",
            dataIndex: "vIs_Active",
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
                    <Button type="link" className="text-secondary-500 font-bold"
                        onClick={() => handleEdit(record)}>ویرایش</Button>
                    <Button type="link" className={"text-red-500 font-bold"}
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
                        محصولات</Typography>
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
                    loading={ldProduct}
                    className="mt-6"
                    columns={columns}
                    dataSource={addIndexToData(product?.records)}
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
                title="ویرایش محصول"
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
                                key={"submit"}>
                                ثبت
                            </Button>
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
                <Form disabled={isMutating} form={form} onFinish={updateProduct}>
                    <ProductForm />
                </Form>
            </Modal>
        </>
    )
}