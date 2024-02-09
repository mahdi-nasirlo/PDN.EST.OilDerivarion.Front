import React, { useState } from 'react'
import { Card } from '@/components/card'
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import StatusColumn from '@/components/custom-table/StatusColumn';
import { Button, Space, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { z } from 'zod';
import { productApi } from 'constance/product';
import EditModal from './edit-modal';
import ConfirmDeleteModal from '@/components/confirm-delete-modal';
import useProductDelete from '@/hooks/basic/product/use-product-delete';

const apiData = productApi.BasicProductGetPage

interface TProps {
    data: z.infer<typeof apiData.response.shape.data> | undefined;
    isLoading: boolean;
    setModalVisible: (arg: boolean) => void;
    setPaginate: (arg: any) => void
}

export default function DataTable({ setModalVisible, data, isLoading, setPaginate }: TProps) {

    const [uidEdit, setGetUidEdit] = useState<string | boolean>();

    const [uidDelete, setUidDelete] = useState<string | boolean>();

    const Delete = useProductDelete()

    const handelDelete = async () => {

        const res = await Delete.mutateAsync({ uid: uidDelete as string });

        if (res.success) {
            setUidDelete(undefined);
        }

    }


    const columns: ColumnsType<
        z.infer<typeof apiData.item>
    > = [
            {
                title: "ردیف",
                dataIndex: "Row",
                key: "1",
                width: "5%",
            },
            {
                title: "نام محصول",
                dataIndex: "name",
                key: "2",
            },
            {
                title: "نام دسته بندی",
                dataIndex: "productCategoryName",
                key: "3",
            },
            {
                title: "فعال/غیر فعال ",
                dataIndex: "isActive",
                key: "4",
                render: (_, record) => <StatusColumn record={record} />,
            },
            {
                title: "مواد اولیه",
                dataIndex: "materials",
                key: "5",
                render: (_, record) => {
                    if (record.materials) {
                        return (
                            <Tooltip
                                placement="top"
                                title={<Typography>{record.materials}</Typography>}
                            >
                                <Typography.Text
                                    className="max-w-[350px]"
                                    ellipsis={true}
                                    style={{ maxWidth: "350px" }}
                                >
                                    {record.materials}
                                </Typography.Text>
                            </Tooltip>
                        );
                    } else {
                        return <Typography>_</Typography>;
                    }
                },
            },
            {
                title: "فاکتور های آزمون",
                dataIndex: "testItems",
                key: "6",
                render: (_, record) => {
                    if (record.testItems) {
                        return (
                            <Tooltip
                                placement="top"
                                title={<Typography>{record.testItems}</Typography>}
                            >
                                <Typography.Text
                                    className="max-w-[350px]"
                                    ellipsis={true}
                                    style={{ maxWidth: "350px" }}
                                >
                                    {record.testItems}
                                </Typography.Text>
                            </Tooltip>
                        );
                    } else {
                        return <Typography>_</Typography>;
                    }
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
                            onClick={() => setGetUidEdit(record.uid)}
                        >
                            ویرایش
                        </Button>
                        <Button
                            type="link"
                            className={"text-red-500 font-bold"}
                            onClick={() => setUidDelete(record.uid)}
                        >
                            حذف
                        </Button>
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
                        text: 'لیست محصولات',
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
                                <span className="flex">افزودن محصول</span>
                            </Button>
                        ]
                    }}
                    setInitialData={setPaginate}
                    isLoading={isLoading}
                    data={data}
                    columns={columns}
                />
            </Card>
            <EditModal
                editModalUid={uidEdit}
                setEditModalUid={setGetUidEdit}
            />
            <ConfirmDeleteModal
                title='محصول'
                open={uidDelete}
                setOpen={setUidDelete}
                handleDelete={handelDelete}
                loading={false}
            />
        </>
    )
}