"use client";

import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableColumnsType } from "antd/lib";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { addIndexToData } from "../../../../../../lib/addIndexToData";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import CustomeTable from "../../../../../../components/CustomeTable";
import StatusColumn from "../../../../../../components/CustomeTable/StatusColumn";

const DataTable = ({
  material,
  ldMaterial,
  setFilter
}: {
  setFilter: (arg: any) => void;
  ldMaterial: boolean;
  material:
  | {
    count: number;
    records: Material[];
  }
  | undefined;
}) => {
  const [activeExpRow, setActiveExpRow] = useState<string[]>();

  const columns: ColumnsType<Material> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%"
    },
    {
      title: "نام ماده اولیه",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "فاکتور های آزمون",
      dataIndex: "TestItems",
      key: "3",
    },
  ];

  return (
    <>
      <CustomeTable
        columns={columns}
        setInitialData={setFilter}
        isLoading={ldMaterial}
        data={material}
        rowKey={"Uid"}
        expandable={{
          expandedRowKeys: activeExpRow,
          onExpand: (expanded, record: Material) => {
            const keys: string[] = [];

            if (expanded && record.uid) {
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
      />
    </>
  );
}

const ExpandedRowRender = ({ material }: { material: Material }) => {
  const [activeExpRow, setActiveExpRow] = useState<string[]>();


  const [open, setOpen] = useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState();

  const defaultValue = {
    materialUid: material.uid,
    testItemUid: null,
    IsActive: null,
  };


  const { data, isLoading, mutate } = useSWR<any[]>(
    ["/MaterialTestItem/GetAll", defaultValue],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
  );

  const { trigger, isMutating } = useSWRMutation(
    "/MaterialTestItem/Delete",
    mutationFetcher
  );

  const deleteProductFactor = async () => {
    // @ts-ignore
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
  }, [material]);

  const expandColumns: TableColumnsType<any> = [
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
    //   render: (_, record) => (
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
        dataSource={addIndexToData(data)}
        loading={isLoading || isMutating}
        expandable={{
          expandedRowKeys: activeExpRow,
        }}
        pagination={false}
      />
      <ConfirmDeleteModal
        loading={isMutating}
        open={open}
        setOpen={setOpen}
        handleDelete={deleteProductFactor}
        title={"فاکتور آزمون ماده اولیه"}
      />
    </>
  );
};

export default DataTable;