
"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import EditModal from "./edit-modal";


export default function DataTable({
    setModalVisible,
    ldMaterial,
    labratory,
    mutate,
}: {
    setModalVisible: any;
    ldMaterial: boolean;
    mutate: () => void;
    labratory:
    | {
        records: LabratoryGet[];
        count: number;
    }
    | undefined;
}) {
    // //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<Labratory | null>(null);

    const handleDelete = (record: Labratory) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const { trigger: deleteLab, isMutating } = useSWRMutation("/Lab/Delete", mutationFetcher);

    const handleConfirmDelete = async () => {
        await deleteLab({
            Uid: recordToDelete?.Uid,
        });

        await mutate();

        setIsDeleteModalVisible(false);

        setRecordToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setRecordToDelete(null);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    //ادیت

    const [isVisibleEditModal, setIsEditModalVisible] = useState<boolean>(false)
    const [recordToEdit, setRecordToEdit] = useState<Labratory | null>(null)

    const handleEdit = (record: Labratory) => {
        setRecordToEdit(record);
        setIsEditModalVisible(true);
    };


    const columns: ColumnsType<Labratory> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام آزمایشگاه",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "شماره ثابت",
            dataIndex: "Tel",
            key: "6",
        },
        {
            title: "فکس",
            dataIndex: "Fax",
            key: "3",
        },
        {
            title: "آدرس",
            dataIndex: "Address",
            key: "8",
        },
        // {
        //   title: "نام خانوادگی مسئول",
        //   dataIndex: "License_No",
        //   key: "4",
        // },
        // {
        //   title: "کد ملی مسئول",
        //   dataIndex: "code",
        //   key: "5",
        // },
        // {
        //   title: "نام مدیر",
        //   dataIndex: "fax",
        //   key: "7",
        // },

        // {
        //   title: "نام خانوادگی مدیر",
        //   dataIndex: "Address",
        //   key: "8",
        // },
        // {
        //   title: "کد ملی مدیر",
        //   dataIndex: "Address",
        //   key: "8",
        // },
        // {
        //   title: "فاکتور آزمون",
        //   dataIndex: "Address",
        //   key: "8",
        // },

        {
            title: "عملیات",
            key: "عملیات",
            fixed: "right",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        className="text-secondary-500 font-bold"
                        onClick={() => handleEdit(record)}
                    >
                        ویرایش
                    </Button>
                    <Button
                        type="link"
                        className={"text-red-500 font-bold"}
                        onClick={() => handleDelete(record)}
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
                    <Typography className="text-right text-[16px] font-normal">لیست آزمایشگاه ها</Typography>
                    <Button
                        className="max-md:w-full flex items-center gap-2 justify-center"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                    >
                        <PlusIcon width={24} height={24} />
                        <span className="flex">افزودن آزمایشگاه</span>
                    </Button>
                </div>
                <Table
                    loading={ldMaterial || isMutating}
                    scroll={{ x: 1500, y: 300 }}
                    dataSource={addIndexToData(labratory?.records)}
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
                title="حذف آزمایشگاه"
                open={isDeleteModalVisible}
                setOpen={handleCancelDelete}
                handleDelete={handleConfirmDelete}
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