"use client";

import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableColumnsType } from "antd/lib";
import React, { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../lib/server/listFetcher";

export default function DataTable({
  material,
  ldMaterial,
}: {
  ldMaterial: boolean;
  material:
    | {
        count: number;
        records: Material[];
      }
    | undefined;
}) {
  const [activeExpRow, setActiveExpRow] = useState<string[]>();

  const columns: ColumnsType<Material> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "نام ماده اولیه",
      dataIndex: "Name",
      key: "2",
    },
  ];

  return (
    <>
      <Table
        className="mt-6"
        columns={columns}
        loading={ldMaterial}
        rowKey={"Uid"}
        expandable={{
          expandedRowKeys: activeExpRow,
          onExpand: (expanded, record: Material) => {
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
          expandedRowRender: (record: Material) => (
            <ExpandedRowRender material={record} />
          ),
        }}
        dataSource={addIndexToData(material?.records)}
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
      {/*<CreateModal setModalVisible={setModalVisible} modalVisible={is}*/}
    </>
  );
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: any;
}

const ExpandedRowRender = ({ material }: { material: Material }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState();

  const defaultValue = {
    productUid: material.Uid,
    testItemUid: null,
    IsActive: true,
  };

  const { data, isLoading, mutate } = useSWR(
    ["/MaterialTestItem/GetAll", defaultValue],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
  );

  const { trigger, isMutating } = useSWRMutation(
    "/MaterialTestItem/Delete",
    mutationFetcher
  );

  const deleteProductFactor = async () => {
    setOpen(false);

    // @ts-ignore
    await trigger({ uid: recordToDelete?.Uid });

    await mutate();
  };

  const expandColumns: TableColumnsType<any> = [
    { title: "#", dataIndex: "Row", key: "1" },
    { title: "نام فاکتور", dataIndex: "TestItemName", key: "2" },
    {
      title: "عملیات",
      dataIndex: "2",
      key: "upgradeNum",
      align: "center",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => {
              setOpen(true);
              // @ts-ignore
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
      {/*@ts-ignore*/}
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
        title={"فاکتور محصول"}
      />
    </>
  );
};
