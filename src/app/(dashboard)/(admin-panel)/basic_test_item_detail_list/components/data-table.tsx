import React, { useState } from 'react'
import { Card } from '@/components/card'
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import StatusColumn from '@/components/custom-table/StatusColumn';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TestItemDetailApi } from 'constance/test-item-detail';
import { z } from 'zod';
import EditModal from './edit-modal';

interface TProps {
    data: z.infer<typeof TestItemDetailApi.BasicTestItemDetailGetPage.item>[] | undefined;
    isLoading: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function DataTable({ setModalVisible, data, isLoading }: TProps) {


    const [editModal, setEditModal] = useState<boolean>(false);

    const columns: ColumnsType<
        z.infer<typeof TestItemDetailApi.BasicTestItemDetailGetPage.item>
    > = [
            {
                title: "ردیف",
                dataIndex: "Row",
                key: "1",
                width: "5%"
            },
            {
                title: "عنوان استاندارد",
                dataIndex: "title",
                key: "2",
            },
            {
                title: "فاکتورهای آزمون",
                dataIndex: "testItemName",
                key: "3",
            },
            {
                title: "شناسه استاندارد",
                dataIndex: "referenceCode",
                key: "4",
            },
            {
                title: "فعال/غیر فعال",
                dataIndex: "isActive",
                key: "4",
                render: (_, record: any) => <StatusColumn record={record} />
            },
            {
                title: "عملیات",
                key: "عملیات",
                align: "center",
                fixed: "right",
                width: "10%",
                render: (_, record: any) => (
                    <Space size="small">
                        <Button
                            type="link"
                            className="text-secondary-500 font-bold"
                            onClick={() => setEditModal(true)}
                        >
                            ویرایش
                        </Button>
                        {/*
                            <Button
                                type="link"
                                className="text-red-500 font-bold"
                                onClick={() => handleDelete(record)}
                            >
                                حذف
                            </Button>
                        */}
                    </Space>
                ),
            },
        ];


    return (
        <>
            <Card className="mt-8">
                <CustomTable
                    header={{
                        icon: <ViewColumnsIcon />,
                        text: 'لیست استاندارد های آزمون',
                        actions: [
                            <Button
                                key={"1"}
                                className="max-md:w-full flex justify- items-center gap-2"
                                size="large"
                                type="primary"
                                htmlType="submit"
                                onClick={() => { setModalVisible(true); }}
                            >
                                <PlusIcon width={24} height={24} />
                                <span className="flex">افزودن استاندارد آزمون</span>
                            </Button>
                        ]
                    }}
                    setInitialData={() => { }}
                    isLoading={isLoading}
                    data={data}
                    columns={columns}
                />
            </Card>
            <EditModal
                editModal={editModal}
                setEditModal={setEditModal}
            />
        </>
    )
}
