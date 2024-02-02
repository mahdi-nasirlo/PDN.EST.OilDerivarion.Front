import React from 'react'
import { Card } from '@/components/card'
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import StatusColumn from '@/components/custom-table/StatusColumn';
import { Button, Space, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { productCategoryApi } from 'constance/product-category';
import { z } from 'zod';
import EditModal from './edit-modal';
import { useProductCategory } from '../hook/use-product-category';

interface TProps {
    data: z.infer<typeof productCategoryApi.BasicProductCategoryGetPage.item>[] | undefined;
    isLoading: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function DataTable({ setModalVisible, data, isLoading }: TProps) {

    const { uid, setGetUid } = useProductCategory();

    const columns: ColumnsType<
        z.infer<typeof productCategoryApi.BasicProductCategoryGetPage.item>
    > = [
            {
                title: "ردیف",
                dataIndex: "Row",
                key: "1",
                width: "5%"
            },
            {
                title: "نام دسته بندی",
                dataIndex: "name",
                key: "2",
            },
            {
                title: "روش تولید",
                dataIndex: "productionMethodName",
                key: "3",
            },
            {
                title: "دانسیته",
                dataIndex: "hasDensity",
                key: "4",
                render: (_, record: any) => {
                    let color = "";
                    let name = "";
                    if (record.hasDensity === false) {
                        color = "red";
                        name = "ندارد";
                    } else {
                        color = "success";
                        name = "دارد";
                    }
                    return <Tag color={color}>{name}</Tag>;
                },
            },
            {
                title: "حداقل بازه دانسیته",
                dataIndex: "densityUpperLimit",
                key: "5",
                render: (_, record: any) => {
                    if (record.densityUpperLimit === null) {
                        return <Typography>_</Typography>;
                    }
                    return <Typography>{record.densityUpperLimit}</Typography>;
                },
            },
            {
                title: "حداکثر بازه دانسیته",
                dataIndex: "densityLowerLimit",
                key: "6",
                render: (_, record: any) => {
                    if (record.densityLowerLimit === null) {
                        return <Typography>_</Typography>;
                    }
                    return <Typography>{record.densityLowerLimit}</Typography>;
                },
            },
            {
                title: "کد",
                dataIndex: "smallCode",
                key: "7",
            },
            {
                title: "فعال / غیر فعال ",
                dataIndex: "isActive",
                key: "8",
                render: (_, record) => <StatusColumn record={record} />
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
                            onClick={() => setGetUid(record.uid)}
                        >
                            ویرایش
                        </Button>
                        {/*
                            <Button
                                type="link"
                                className={"text-red-500 font-bold"}
                                onClick={() => {
                                setIsDeleteModalVisible(true);
                                setRecordToDelete(record);
                                }}
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
                        text: 'لیست دسته بندی محصولات',
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
                                <span className="flex">افزودن دسته بندی</span>
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
                editModalUid={uid}
                setEditModalUid={setGetUid}
            />
        </>
    )
}
