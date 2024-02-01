import React, { useState } from 'react'
import { Card } from '@/components/card'
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import StatusColumn from '@/components/custom-table/StatusColumn';
import { Button, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TestItemApi } from 'constance/test-item';
import { z } from 'zod';
import EditModal from './edit-modal';

interface TProps {
    data: z.infer<typeof TestItemApi.BasicTestItemGetPage.item>[] | undefined;
    isLoading: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function DataTable({ setModalVisible, data, isLoading }: TProps) {


    const [editModal, setEditModal] = useState<boolean>(false);

    const columns: ColumnsType<
        z.infer<typeof TestItemApi.BasicTestItemGetPage.item>
    > = [
            {
                title: "ردیف",
                dataIndex: "Row",
                key: "1",
                width: "5%"
            },
            {
                title: "نام فاکتور آزمون",
                dataIndex: "name",
                key: "2",
            },
            {
                title: "واحد اندازه گیری",
                dataIndex: "measureName",
                key: "3",
            },
            {
                title: "فعال/غیر فعال ",
                dataIndex: "isActive",
                key: "4",
                render: (e, record) => <StatusColumn record={record} />
            },
            {
                title: "مدت زمان انجام آزمایش",
                dataIndex: "testDuration",
                key: "5",
                render: (_, record) => {
                    return (
                        <Typography.Text>
                            {record.uid !== undefined && record.uid !== null
                                ? `${record.uid} ساعت`
                                : 'تعریف نشده'}
                        </Typography.Text>
                    );
                },
            },
            {
                title: "جزئیات",
                key: "جزئیات",
                align: "center",
                fixed: "right",
                width: "10%",
                render: (_, record) => (
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
                        text: 'لیست فاکتور های آزمون',
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
                                <span className="flex">افزودن فاکتور آزمون</span>
                            </Button>
                        ]
                    }}
                    setInitialData={() => {
                    }}
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
