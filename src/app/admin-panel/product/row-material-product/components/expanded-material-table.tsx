import { Product } from "../../../../../../interfaces/product";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { TableColumnsType } from "antd/lib";
import { Button, Space, Switch, Table } from "antd";
import { addIndexToData } from "../../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";

export const ExpandedMaterialTable = ({ product }: { product: Product }) => {

    const [open, setOpen] = useState<boolean>(false);

    const [recordToDelete, setRecordToDelete] = useState<Product>();

    const defaultValue = {
        productUid: product.Uid,
        materialUid: null,
        is_Active: null
    }

    const { data, isLoading, mutate } = useSWR("/ProductMaterial/GetAll", (url) => listFetcher(url, { arg: defaultValue }))

    useEffect(() => {

        if (!isLoading) {
            mutate()
        }

    }, [product])


    const { trigger, isMutating } = useSWRMutation("/ProductMaterial/Delete", mutationFetcher)

    const handleDelete = async () => {

        setOpen(false)

        await trigger({ Uid: recordToDelete?.Uid })

        await mutate()

    }

    const expandColumns: TableColumnsType<any> = [
        {
            title: "#",
            dataIndex: "Row",
            key: "1"
        },
        {
            title: "نام ماده اولیه",
            dataIndex: "MaterialName",
            key: "2"
        },
        {
            title: "فعال/غیر فعال",
            dataIndex: "Is_Active",
            key: "3",
            render: (e, record) => <Switch defaultChecked={record.Is_Active} />,
        },
        {
            title: "عملیات",
            dataIndex: "2",
            key: "upgradeNum",
            align: "center",
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        className="text-red-500 font-bold"
                        onClick={() => {
                            setOpen(true);
                            setRecordToDelete(record)
                        }}
                    >
                        حذف
                    </Button>
                </Space>
            ),
        },
    ];

    return <>
        <Table
            columns={expandColumns}
            dataSource={addIndexToData(data)}
            loading={isLoading || isMutating}
            pagination={false}
        />
        <ConfirmDeleteModal
            open={open}
            setOpen={setOpen}
            handleDelete={handleDelete}
            title={"فاکتور محصول"}
        />
    </>
}
