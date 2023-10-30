"use client";

import {Button, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {TableColumnsType} from "antd/lib";
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import {addIndexToData} from "../../../../../lib/addIndexToData";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import CustomeTable from "../../../../../components/CustomeTable";

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
    },
    {
      title: "نام ماده اولیه",
      dataIndex: "Name",
      key: "2",
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
                      <ExpandedRowRender material={record}/>
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
    materialUid: material.Uid,
    testItemUid: null,
    IsActive: true,
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
    await trigger({ uid: recordToDelete?.Uid });

    await mutate();

    setOpen(false);
  };

  useEffect(() => {
    if (!isLoading) {
      mutate();
    }
  }, [material]);

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
        title={"فاکتور ماده اولیه"}
      />
    </>
  );
};

export default DataTable;
