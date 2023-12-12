"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Col, Form, Modal, Row, Space, Typography, } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import CustomeTable from "../../../../../components/CustomeTable";
import StatusColumn from "../../../../../components/CustomeTable/StatusColumn";
import TestExpandedRowRender from "./test-expandedRowRender";
import MaterialForm from "./material-form";

export default function DataTable({
    setFilter,
    isValidating,
    setModalVisible,
    ldMaterial,
    material,
    mutate,
}: {
    setFilter: (arg: any) => void
    isValidating: any;
    setModalVisible: any;
    ldMaterial: boolean;
    mutate: () => void;
    material:
    | {
        count: number;
        records: Material[];
    }
    | undefined;
}) {

    const [activeExpRow, setActiveExpRow] = useState<string[]>();

    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<Material | null>(null);

    const handleDelete = (record: Material) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const { trigger: deleteMaterial, isMutating: ldDeleteMaterial } =
        useSWRMutation("/Material/Delete", mutationFetcher);

    const handleConfirmDelete = async () => {
        const res = await deleteMaterial({ uid: recordToDelete?.uid });
        if (res) {
            await mutate();

            setIsDeleteModalVisible(false);
        }
        setRecordToDelete(null);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    //ادیت

    const [form] = useForm();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<Material | null>(null);

    const handleEdit = (record: Material) => {
        setRecordToEdit(record);
        setIsEditModalVisible(true);
    };

    const { trigger: UpdateMaterial, isMutating: ldUpdateMaterial } =
        useSWRMutation("/Material/Update", mutationFetcher);

    const sendEditRequest = async (values: Material) => {
        values.uid = recordToEdit?.uid;

        const res = await UpdateMaterial(values);
        if (res) {
            await mutate();

            setIsEditModalVisible(false);
        }
        setRecordToEdit(null);
    };

    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
        setRecordToEdit(null);
    };

    useEffect(() => {

        const newData = recordToEdit?.testItems?.map((item) => {
            return item.uid
        })

        form.setFieldsValue({ ...recordToEdit, testItems: newData });

    }, [recordToEdit]);

    const columns: ColumnsType<Material> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام ماده اولیه",
            dataIndex: "name",
            key: "2",
        },
        {
            title: "واحد اندازه گیری",
            dataIndex: "measureName",
            key: "3",
        },
        {
            title: "فعال/غیر فعال",
            dataIndex: "isActive",
            key: "4",
            render: (_, record: any) => <StatusColumn record={record} />
        },
        {
            title: "فاکتور های آزمون",
            dataIndex: "testItems",
            key: "5",
            render: (_, record: Material) => {
                let testItemNames = record.testItems?.map(item => item.name).join(', ');

                return (
                    <Typography className="max-w-[180px]">
                        {testItemNames}
                    </Typography>
                );
            },
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
                        onClick={() => handleEdit(record)}
                    >
                        ویرایش
                    </Button>
                    {/* <Button
                        type="link"
                        className="text-red-500 font-bold"
                        onClick={() => handleDelete(record)}
                    >
                        حذف
                    </Button> */}
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-between items-center">
                    <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
                        لیست مواد اولیه
                    </Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                    >
                        <PlusIcon width={24} height={24} />
                        <span className="flex">افزودن ماده اولیه</span>
                    </Button>
                </div>
                <CustomeTable
                    columns={columns}
                    setInitialData={setFilter}
                    isLoading={ldMaterial || ldDeleteMaterial || isValidating}
                    data={material}
                    rowKey={"uid"}
                    expandable={{
                        expandedRowKeys: activeExpRow,
                        onExpand: (expanded, record: Material) => {
                            const keys: string[] = [];

                            if (expanded && record.uid) {
                                // @ts-ignore
                                keys.push(record.uid);
                            }

                            if (!expanded) {
                                keys.pop();
                            }

                            setActiveExpRow(keys);
                        },
                        expandedRowRender: (record: Material) => (
                            <TestExpandedRowRender material={record} TableMutate={mutate} />
                        ),
                    }}
                />
            </div >
            {/* جذف */}
            < ConfirmDeleteModal
                loading={ldDeleteMaterial}
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
                footer={
                    [
                        <Row key={"box"} gutter={[16, 16]} className="my-2">
                            <Col xs={24} md={12}>
                                <Button
                                    loading={ldUpdateMaterial}
                                    size="large"
                                    className="w-full"
                                    type="primary"
                                    onClick={() => form.submit()}
                                    key={"submit"}
                                >
                                    ثبت
                                </Button>
                            </Col>
                            <Col xs={24} md={12}>
                                <Button
                                    disabled={ldUpdateMaterial}
                                    size="large"
                                    className="w-full bg-gray-100 text-warmGray-500"
                                    onClick={handleCancelEdit}
                                    key={"cancel"}
                                >
                                    انصراف
                                </Button>
                            </Col>
                        </Row>,
                    ]}
            >
                <Form
                    onFinish={sendEditRequest}
                    disabled={ldUpdateMaterial}
                    form={form}
                    layout="vertical"
                >
                    <MaterialForm />
                </Form>
            </Modal>
        </>
    );
}
