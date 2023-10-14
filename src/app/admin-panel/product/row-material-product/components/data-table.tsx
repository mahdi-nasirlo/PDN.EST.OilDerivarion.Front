"use client";

import { PlusIcon } from '@heroicons/react/24/outline'
import { Button, Space, Switch, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import { Product } from '../../../../../../interfaces/product';
import { addIndexToData } from '../../../../../../lib/addIndexToData';
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { ExpandedMaterialTable } from "@/app/admin-panel/product/row-material-product/components/expanded-material-table";


export default function DataTable({setModalVisible, ldProduct, product, mutate}: {
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

    const { trigger: deleteProduct, isMutating: ldDelete } = useSWRMutation("/Product/Delete", mutationFetcher)

    const handleConfirmDelete = async () => {

        await deleteProduct({
            uid: recordToDelete?.Uid
        })

        setIsDeleteModalVisible(false);

        await mutate()

    };


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
            title: "فاکتورهای آزمون",
            dataIndex: "TestItems",
            key: "6",
        },
        {
            title: "مواد اولیه",
            dataIndex: "Materials",
            key: "7"
        },
        {
            title: "عملیات",
            key: "عملیات",
            render: (_, record) => (
                <Button type="link" className={"text-red-500 font-bold"}
                        onClick={() => handleDelete(record)}>حذف</Button>
            ),
        },
    ];

    const [activeExpRow, setActiveExpRow] = useState<string[]>([])

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
                        onClick={() => setModalVisible(true)}
                    >
                        <PlusIcon width={24} height={24} />
                        <span className="flex gap-2">افزودن محصول جدید</span>
                    </Button>
                </div>
                <Table
                    loading={ldProduct || ldDelete}
                    className="mt-6"
                    columns={columns}
                    rowKey={"Uid"}
                    expandable={{
                        expandedRowKeys: activeExpRow,
                        onExpand: (expanded, record: Product) => {

                            const keys: string[] = [];


                            if (expanded && record.Uid) {
                                // @ts-ignore
                                keys.push(record.Uid);
                            }

                            if (!expanded) {
                                keys.pop()
                            }

                            setActiveExpRow(keys);

                        },
                        expandedRowRender: (record: Product) => <ExpandedMaterialTable product={record} />,
                    }}
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
        </>
    )
}


