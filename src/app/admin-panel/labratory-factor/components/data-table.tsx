"use client";

import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableColumnsType } from "antd/lib";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWRMutation from "swr/mutation";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { ProductTestItem } from "../../../../../interfaces/product";
import CustomeTable from "../../../../../components/CustomeTable";
import { addAlphabetToData } from "../../../../../lib/addAlphabetToData";
import StatusColumn from "../../../../../components/CustomeTable/StatusColumn";

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
    <CustomeTable
      setInitialData={setFilter}
      isLoading={ldProduct || isValidating}
      data={Labratory}
      rowKey={"Uid"}
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
  const [activeExpRow, setActiveExpRow] = useState<string[]>();

  const [open, setOpen] = useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState<
    ProductTestItem | undefined
  >();

  const defaultValue = {
    labUid: Labratory.Uid,
    testItemUid: null,
    IsActive: null,
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
    const res = await trigger({ uid: recordToDelete?.Uid });
    if (res) {
      await mutate();

      setOpen(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      mutate();
    }
  }, [Labratory]);

  const expandColumns: TableColumnsType<ProductTestItem> = [
    { title: "#", dataIndex: "Row", key: "1", width: "5%" },
    { title: "نام فاکتور آزمون", dataIndex: "TestItemName", key: "2" },
    {
      title: "فعال/غیر فعال",
      dataIndex: "IsActive",
      key: "4",
      render: (_, record: any) => <StatusColumn record={record} />
    },
    // {
    //   title: "عملیات",
    //   dataIndex: "2",
    //   key: "upgradeNum",
    //   align: "center",
    //   fixed: "right",
    //   width: "10%",
    //   render: (_, record: ProductTestItem) => (
    //     <Space size="small">
    //       <Button
    //         type="link"
    //         className="text-red-500 font-bold"
    //         onClick={() => {
    //           setOpen(true);
    //           setRecordToDelete(record);
    //         }}
    //       >
    //         حذف
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <Table
        columns={expandColumns}
        dataSource={addAlphabetToData(data)}
        loading={isLoading || isMutating}
        pagination={false}
        expandable={{
          expandedRowKeys: activeExpRow,
        }}
      />
      <ConfirmDeleteModal
        loading={isMutating}
        open={open}
        setOpen={setOpen}
        handleDelete={deleteProductFactor}
        title="فاکتور آزمون آزمایشگاه"
      />
    </>
  );
};

export default DataTable;
