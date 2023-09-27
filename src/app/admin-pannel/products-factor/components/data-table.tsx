import {Button, Space, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {Product, ProductTestItem} from "../../../../../interfaces/product";
import React, {useState} from "react";
import useSWR from "swr";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {TableColumnsType} from "antd/lib";
import {addIndexToData} from "../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";


const columns: ColumnsType<Product> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {title: 'نام محصول', dataIndex: 'Name', key: '2'},
];


const DataTable = ({product, ldProduct}: { product: Product[], ldProduct: boolean }) => {

    const [activeExpRow, setActiveExpRow] = useState<string[]>()

    return (
        <Table
            className="mt-6"
            columns={columns}
            rowKey={"Uid"}
            loading={ldProduct}
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
                expandedRowRender: (record: Product) => <ExpandedRowRender product={record}/>,
            }}
            dataSource={product}
        />
    )
};


const ExpandedRowRender = ({product}: { product: Product }) => {

    const [open, setOpen] = useState<boolean>(false);

    const [recordToDelete, setRecordToDelete] = useState<ProductTestItem | undefined>();

    const defaultValue = {
        "productUid": product.Uid,
        "testItemUid": null,
        "is_Active": true
    }

    const {
        data,
        isLoading,
        mutate
    } = useSWR<ProductTestItem[]>(["/ProductTestItem/GetAll", defaultValue], ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg}))

    const {trigger} = useSWRMutation("/ProductTestItem/Delete", mutationFetcher)

    const deleteProductFactor = async () => {

        await trigger({uid: recordToDelete?.Uid})

        await mutate()

        setOpen(false)

    }

    const expandColumns: TableColumnsType<ProductTestItem> = [
        {title: "#", dataIndex: "Row", key: "1"},
        {title: "نام فاکتور", dataIndex: "TestItemName", key: "2"},
        {
            title: "عملیات",
            dataIndex: "2",
            key: "upgradeNum",
            render: (_, record: ProductTestItem) => (
                <Space size="middle">
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
        <Table columns={expandColumns} dataSource={addIndexToData(data)} loading={isLoading}
               pagination={false}/>
        <ConfirmDeleteModal open={open} setOpen={setOpen} handleDelete={deleteProductFactor} title={"فاکتور محصول"}/>
    </>
}

export default DataTable;