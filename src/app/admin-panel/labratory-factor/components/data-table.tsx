"use client";

import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableColumnsType } from "antd/lib";
import React, { useState } from "react";
import useSWR from "swr";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWRMutation from "swr/mutation";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { ProductTestItem } from "../../../../../interfaces/product";


const columns: ColumnsType<Labratory> = [
  {
    title: "ردیف",
    dataIndex: "Row",
    key: "1",
  },
  { title: 'آزمایشگاه', dataIndex: 'Name', key: '2' },
  { title: 'استان', dataIndex: 'StateName', key: '3' },
];


const DataTable = ({ Labratory, ldProduct }: { Labratory: Labratory[], ldProduct: boolean }) => {

  const [activeExpRow, setActiveExpRow] = useState<string[]>()

  return (
    <Table
      className="mt-6"
      columns={columns}
      rowKey={"Uid"}
      loading={ldProduct}
      expandable={{
        expandedRowKeys: activeExpRow,
        onExpand: (expanded, record: Labratory) => {

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
        expandedRowRender: (record: Labratory) => <ExpandedRowRender Labratory={record} />,
      }}
      dataSource={Labratory}
    />
  )
};


const ExpandedRowRender = ({ Labratory }: { Labratory: Labratory }) => {

  const [open, setOpen] = useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState<ProductTestItem | undefined>();

  const defaultValue = {
    "productUid": Labratory.Uid,
    "testItemUid": null,
    "is_Active": true
  }

  const {
    data,
    isLoading,
    mutate
  } = useSWR<ProductTestItem[]>(["/LabTestItem/GetAll", defaultValue], ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg }))

  const { trigger, isMutating } = useSWRMutation("/LabTestItem/Delete", mutationFetcher)

  const deleteProductFactor = async () => {

    await trigger({ uid: recordToDelete?.Uid })

    await mutate()

    setOpen(false)

  }

  const expandColumns: TableColumnsType<ProductTestItem> = [
    { title: "#", dataIndex: "Row", key: "1" },
    { title: "نام فاکتور", dataIndex: "TestItemName", key: "2" },
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
    <Table
      columns={expandColumns}
      dataSource={addIndexToData(data)}
      loading={isLoading || isMutating}
      pagination={false}
    />
    <ConfirmDeleteModal
      open={open}
      setOpen={setOpen}
      handleDelete={deleteProductFactor}
      title={"فاکتور آزمایشگاه"}
    />
  </>
}

export default DataTable;