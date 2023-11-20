"use client";

import ConfirmDeleteModal from '@/components/confirm-delete-modal';
import { Button, Space, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import StatusColumn from '../../../../../../components/CustomeTable/StatusColumn';
import CustomeTable from "../../../../../../components/CustomeTable";
import { PlusIcon } from '@heroicons/react/24/outline';
import { mutationFetcher } from '../../../../../../lib/server/mutationFetcher';
import useSWRMutation from "swr/mutation";
import EditModal from './edit-modal';


export default function DataTable({
    setFilter,
    setModalVisible,
    ldUser,
    User,
    mutate,
}: {
    setFilter: (arg: any) => void
    setModalVisible: any;
    ldUser: boolean;
    mutate: () => void;
    User:
    | {
        records: any[];
        count: number;
    }
    | undefined;
}) {


    const showModal = () => {
        setModalVisible(true);
    };

    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<any | null>(null);

    const handleDelete = (record: any) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };
    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setRecordToDelete(null); // Clear the recordToDelete
    };

    const { trigger: deleteUser, isMutating: ldDeleteUser } = useSWRMutation(
        "/User/Delete",
        mutationFetcher
    );

    const handleConfirmDelete = async () => {
        const res = await deleteUser({ uid: recordToDelete?.Uid });

        if (res) {
            await mutate();

            setIsDeleteModalVisible(false);
        }
        setRecordToDelete(null);
    };

    //ادیت

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<any | null>(null);

    const handleEdit = (record: any) => {
        setRecordToEdit(record);
        setIsEditModalVisible(true);
    };

    const columns: ColumnsType<any> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام",
            dataIndex: "FirstName",
            key: "2",
        },
        {
            title: "نام خانوادگی",
            dataIndex: "LastName",
            key: "2",
        },
        {
            title: "کد ملی",
            dataIndex: "NationalCode",
            key: "3",
        },
        {
            title: "نوع کاربر",
            dataIndex: "UserTypeName",
            key: "4",
        },
        {
            title: "فعال/غیرفعال",
            dataIndex: "password",
            key: "5",
            render: (e, record) => <StatusColumn record={record} />
        },
        {
            title: "محل فعالیت",
            dataIndex: ["ProducerName", "StateName", "LabName"],
            key: "6",
            render: (_, record) => {
                if ((record.ProducerName || record.StateName || record.LabName) === null) {
                    return <Typography> _ </Typography>
                } return <Typography>{(record.ProducerName || record.StateName || record.LabName)}</Typography>
            }
        },
        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: 'right',
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
                    <Button
                        type="link"
                        className="text-red-500 font-bold"
                        onClick={() => handleDelete(record)}
                    >
                        حذف
                    </Button>
                </Space >
            ),
        },
    ];
    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-between items-center">
                    <Typography className="text-right text-[16px] font-normal">
                        لیست کاربران
                    </Typography>
                    <Button
                        className="max-md:w-full flex items-center gap-2 justify-center"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                    >
                        <PlusIcon width={24} height={24} />
                        <span className="flex">افزودن کاربر</span>
                    </Button>
                </div>
                <CustomeTable
                    setInitialData={setFilter}
                    isLoading={ldUser}
                    data={User}
                    columns={columns}
                />
            </div>
            {/* جذف */}
            <ConfirmDeleteModal
                title="حذف کاربر"
                loading={ldDeleteUser}
                open={isDeleteModalVisible}
                setOpen={handleCancelDelete}
                handleDelete={handleConfirmDelete}
            />
            {/* ویرایش */}
            <EditModal
                isEditModalVisible={isEditModalVisible}
                setIsEditModalVisible={setIsEditModalVisible}
                setRecordToEdit={setRecordToEdit}
                recordToEdit={recordToEdit}
                mutate={mutate}
            />
        </>
    )
}
