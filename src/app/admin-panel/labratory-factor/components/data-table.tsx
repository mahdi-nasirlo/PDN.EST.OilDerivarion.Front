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

const columns: ColumnsType<Labratory> = [
  {
    title: "ردیف",
    dataIndex: "Row",
    key: "1",
  },
  { title: "آزمایشگاه", dataIndex: "Name", key: "2" },
  { title: "استان", dataIndex: "StateName", key: "3" },
  { title: "مجوز ها", dataIndex: "License_No", key: "2" },

  { title: "تاریخ اعتبار مجوز", dataIndex: "License_Expire_Date", key: "2" },
  { title: "شماره ثابت", dataIndex: "Tel", key: "2" },

  { title: "فکس", dataIndex: "Fax", key: "2" },
  { title: "آدرس", dataIndex: "Address", key: "2" },
];

const DataTable = ({
  isValidating,
  Labratory,
  ldProduct,
}: {
  isValidating: any;
  Labratory: Labratory[];
  ldProduct: boolean;
}) => {
  const [activeExpRow, setActiveExpRow] = useState<string[]>();

  return (
    <Table
      className="mt-6"
      columns={columns}
      rowKey={"Uid"}
      loading={ldProduct || isValidating}
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
          <ExpandedRowRender isValidating={isValidating} Labratory={record} />
        ),
      }}
      dataSource={Labratory}
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
  );
};

const ExpandedRowRender = ({
  Labratory,
  isValidating,
}: {
  Labratory: Labratory;
  isValidating: any;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState<
    ProductTestItem | undefined
  >();

  const defaultValue = {
    productUid: Labratory.Uid,
    testItemUid: null,
    is_Active: true,
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
    { title: "#", dataIndex: "Row", key: "1" },
    { title: "نام فاکتور", dataIndex: "TestItemName", key: "2" },
    {
      title: "عملیات",
      dataIndex: "2",
      key: "upgradeNum",
      align: "center",
      fixed: "right",
      width: 150,
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
        loading={isLoading || isMutating || isValidating}
        pagination={false}
      />
      <ConfirmDeleteModal
        open={open}
        setOpen={setOpen}
        handleDelete={deleteProductFactor}
        title={"فاکتور آزمایشگاه"}
      />
    </>
  );
};

export default DataTable;
