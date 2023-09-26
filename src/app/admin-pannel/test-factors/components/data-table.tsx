"use client"

import {PlusIcon} from '@heroicons/react/24/outline'
import {Button, Space, Switch, Table, Typography} from 'antd'
import {ColumnsType} from 'antd/es/table';
import React, {useState} from 'react'
import {TableColumnsType} from "antd/lib";
import {addIndexToData} from "../../../../../lib/addIndexToData";
import {TestItem} from "../../../../../interfaces/TestItem";
import EditModal from "@/app/admin-pannel/test-factors/components/edit-modal";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";


export default function DataTable({setModalVisible, ldTestItem, TestItem, mutate}: {
    setModalVisible: any,
    ldTestItem: boolean,
    mutate: () => void,
    TestItem: {
        records: TestItem[],
        count: number
    } | undefined
}) {

    const [openEdit, setOpenEdit] = useState<TestItem | undefined>(undefined)

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<TestItem | null>(null);

    const handleDelete = (record: TestItem) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const {trigger} = useSWRMutation("/TestItem/Delete", mutationFetcher)

    const handleConfirmDelete = async () => {

        setIsDeleteModalVisible(false);

        await trigger({
            uid: recordToDelete?.Uid
        })

        await mutate()

    };
    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setRecordToDelete(null);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const columns: ColumnsType<TestItem> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام فاکتور",
            dataIndex: "Name",
            key: "2",
        },
        {
            title: "روش آزمون",
            dataIndex: "TestMethod",
            key: "3",
        },
        {
            title: "مقدار تجدید پذیری",
            dataIndex: "ReNewabillity_Value",
            key: "4",
        },
        {
            title: "تجدید پذیری",
            dataIndex: "ReNewabillity",
            key: "5",
        },
        {
            title: "مقیاس آزمون",
            dataIndex: "MeasureName",
            key: "6",
        },
        {
            title: "فعال/غیر فعال ",
            dataIndex: "Is_Active",
            key: "4",
            render: (e, record) => <Switch defaultChecked={record.Is_Active}/>,
        },
        {
            title: "جزئیات",
            key: "جزئیات",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" className={"text-primary-500 font-bold"}
                            onClick={() => setOpenEdit(record)}>ویرایش</Button>
                    <Button type="link" className={"text-red-500 font-bold"}
                            onClick={() => handleDelete(record)}>حذف</Button>
                </Space>
            ),
        },
    ];

    interface ExpandedDataType {
        key: React.Key;
        date: string;
        name: string;
        upgradeNum: string;
    }

    const expandedRowRender = () => {
        const columns: TableColumnsType<ExpandedDataType> = [
            { title: '#', dataIndex: '1', key: 'date' },
            { title: 'نام ماده اولیه', dataIndex: '1', key: 'name' },
            { title: 'عملیات', dataIndex: '2', key: 'upgradeNum' },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={[]} pagination={false} />;
    };


    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <div className="flex justify-between items-center">
                    <Typography className="text-right text-[16px] font-normal">لیست تولید کننده ها</Typography>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                    >
                        <PlusIcon width={24} height={24}/>
                        <span className="flex  ">
                            افزودن فاکتور آزمون
                        </span>
                    </Button>
                </div>
                <Table
                    className="mt-6"
                    columns={columns}
                    loading={ldTestItem}
                    // expandable={{expandedRowRender: expandedRowRender}}
                    dataSource={addIndexToData(TestItem?.records)}
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
                <EditModal mutate={mutate} editRecord={openEdit} setEditRecord={setOpenEdit}/>
            </div>
            <ConfirmDeleteModal open={isDeleteModalVisible} setOpen={setIsDeleteModalVisible}
                                handleDelete={handleConfirmDelete} title="مواد اولیه"/>
        </>
    )
}

