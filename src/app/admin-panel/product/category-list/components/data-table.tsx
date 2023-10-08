"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Switch, Table, Typography, } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Category } from "../../../../../../interfaces/category";
import { addIndexToData } from "../../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import EditModal from "@/app/admin-panel/product/category-list/components/edit-modal";

export default function DataTable({ setModalVisible, category, ldCategory, mutate }: {
    setModalVisible: any;
    category: Category[] | undefined;
    mutate: () => void;
    ldCategory: boolean
}) {

    const [isVisibleEditModal, setIsEditModalVisible] = useState<boolean>(false)
    const [recordToEdit, setRecordToEdit] = useState<Category | null>(null)

    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<Category | null>(null);

    const {
        trigger: deleteCategory,
        isMutating: ldDelete
    } = useSWRMutation("/ProductCategory/Delete", mutationFetcher)

    const handleDelete = async () => {

        console.log(recordToDelete?.Uid)

        await deleteCategory({
            "uid": recordToDelete?.Uid
        })

        await mutate()

        setIsDeleteModalVisible(false);

        setRecordToDelete(null);

    };

    const showModal = () => {
        setModalVisible(true);
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
            title: "دانسیته",
            dataIndex: "HasDensity",
            key: "3",
            render: (_, record) => <>{record.HasDensity ? "بله" : "خیر"}</>
        },
        {
            title: "حداقل بازه",
            dataIndex: "DensityLowerLimit",
            key: "4",
        },
        {
            title: "حداکثر بازه",
            dataIndex: "DensityUpperLimit",
            key: "5",
        },
        {
            title: "فعال/غیر فعال ",
            dataIndex: "ConfirmedRequestCode",
            key: "6",
            render: (e, record) => <Switch defaultChecked={record.Is_Active} />,
        },
        {
            title: "عملیات",
            key: "عملیات",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        className="text-secondary-500 font-bold"
                        onClick={() => {
                            setRecordToEdit(record);
                            setIsEditModalVisible(true)
                        }}
                    >
                        ویرایش
                    </Button>
                    <Button
                        type="link"
                        className={"text-red-500 font-bold"}
                        onClick={() => {
                            setIsDeleteModalVisible(true);
                            setRecordToDelete(record)
                        }}
                    >
                        حذف
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-between items-center">
                    <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
                        لیست دسته بندی محصولات
                    </Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        onClick={showModal}
                    >
                        <PlusIcon width={24} height={24} />
                        <span className="flex ">افزودن دسته بندی</span>
                    </Button>
                </div>
                <Table
                    className="mt-6"
                    columns={columns}
                    loading={ldCategory || ldDelete}
                    dataSource={addIndexToData(category)}
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
                handleDelete={handleDelete}
                title="دسته بندی محصول"
            />
            {/* ویرایش */}
            <EditModal
                mutate={mutate}
                recordToEdit={recordToEdit}
                setIsEditModalVisible={setIsEditModalVisible}
                isEditModalVisible={isVisibleEditModal}
                setRecordToEdit={setRecordToEdit}
            />
        </>
    );
}
