"use client";

import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableColumnsType } from "antd/lib";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWRMutation from "swr/mutation";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { ProductTestItem } from "../../../../../interfaces/product";
import CustomeTable from "../../../../../components/CustomeTable";

const columns: ColumnsType<Labratory> = [
  { title: "ردیف", dataIndex: "Row", key: "1", width: "5%" },
  { title: "آزمایشگاه", dataIndex: "Name", key: "2" },
  { title: "استان", dataIndex: "StateName", key: "3" },
  { title: "مجوز ها", dataIndex: "License_No", key: "2" },

  { title: "تاریخ اعتبار مجوز", dataIndex: "License_Expire_Date", key: "2" },
];

const DataTable = ({
  setFilter,
  isValidating,
  Labratory,
  ldProduct,
}: {
  setFilter: (arg: any) => void,
  isValidating: any;
  Labratory: { records: Labratory[], count: number } | undefined;
  ldProduct: boolean;
}) => {
  const [activeExpRow, setActiveExpRow] = useState<string[]>();

  return (
    // <CustomeTable
    //     data={Labratory}
    //     className="mt-6"
    //     columns={columns}
    //     rowKey={"Uid"}
    //     loading={false}
    //     expandable={{
    //         expandedRowKeys: activeExpRow,
    //         onExpand: (expanded, record: Labratory) => {
    //             const keys: string[] = [];
    //
    //             if (expanded && record.Uid) {
    //                 // @ts-ignore
    //                 keys.push(record.Uid);
    //             }
    //
    //             if (!expanded) {
    //                 keys.pop();
    //             }
    //
    //             setActiveExpRow(keys);
    //         },
    //         expandedRowRender: (record: Labratory) => (
    //             <ExpandedRowRender Labratory={record}/>
    //         ),
    //     }}
    //     setInitialData={setFilter}
    // />
    <CustomeTable rowKey={"Uid"} setInitialData={setFilter} isLoading={ldProduct || isValidating} data={Labratory}
      columns={columns}
      expandable={{
        expandedRowKeys: activeExpRow,
        onExpand: (expanded, record: Labratory) => {
          const keys: string[] = [];

          if (expanded && record.Uid) {
            // @ts-ignore
            keys.push(record.Uid);
          }

          if (!expanded) {
            keys.pop();
          }

          setActiveExpRow(keys);
        },
        expandedRowRender: (record: Labratory) => (
          <ExpandedRowRender Labratory={record} />
        ),
      }}
    />
  );
};

const ExpandedRowRender = ({
  Labratory,
}: {
  Labratory: Labratory;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState<
    ProductTestItem | undefined
  >();

  const defaultValue = {
    productUid: Labratory.Uid,
    testItemUid: null,
    IsActive: true,
  };

  const { data, isLoading, mutate } = useSWR<ProductTestItem[]>(
    ["/LabTestItem/GetAll", defaultValue],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
  );

  const { trigger, isMutating } = useSWRMutation(
    "/LabTestItem/Delete",
    mutationFetcher
  );

  const deleteProductFactor = async () => {
    await trigger({ uid: recordToDelete?.Uid });

    await mutate();

    setOpen(false);
  };

  useEffect(() => {
    if (!isLoading) {
      mutate();
    }
  }, [Labratory]);

  const expandColumns: TableColumnsType<ProductTestItem> = [
    { title: "#", dataIndex: "Row", key: "1", width: "5%" },
    { title: "نام فاکتور", dataIndex: "TestItemName", key: "2" },
    {
      title: "عملیات",
      dataIndex: "2",
      key: "upgradeNum",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record: ProductTestItem) => (
        <Space size="small">
          <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => {
              setOpen(true);
              setRecordToDelete(record);
            }}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={expandColumns}
        dataSource={addIndexToData(data)}
        loading={isLoading || isMutating}
        pagination={false}
      />
      <ConfirmDeleteModal
        loading={isMutating}
        open={open}
        setOpen={setOpen}
        handleDelete={deleteProductFactor}
        title={"فاکتور آزمایشگاه"}
      />
    </>
  );
};

export default DataTable;
