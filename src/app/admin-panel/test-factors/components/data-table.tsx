"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Switch, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import { TestItem } from "../../../../../interfaces/TestItem";
import EditModal from "@/app/admin-panel/test-factors/components/edit-modal";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import ChangeStatus from "../../../../../components/inputs/ChangeStatus";

export default function DataTable({
  setModalVisible,
  ldTestItem,
  TestItem,
  mutate,
}: {
  setModalVisible: any;
  ldTestItem: boolean;
  mutate: () => void;
  TestItem:
    | {
        records: TestItem[];
        count: number;
      }
    | undefined;
}) {
  const [openEdit, setOpenEdit] = useState<TestItem | undefined>(undefined);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<TestItem | null>(null);

  const handleDelete = (record: TestItem) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const { trigger, isMutating } = useSWRMutation(
    "/TestItem/Delete",
    mutationFetcher
  );

  const handleConfirmDelete = async () => {
    setIsDeleteModalVisible(false);

    await trigger({
      uid: recordToDelete?.Uid,
    });

    await mutate();
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const columns: ColumnsType<TestItem> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "نام فاکتور",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "روش آزمون",
      dataIndex: "TestMethod",
      key: "3",
    },
    {
      title: "مقدار تجدید پذیری",
      dataIndex: "ReNewabillity_Value",
      key: "4",
    },
    {
      title: "تجدید پذیری",
      dataIndex: "ReNewabillity",
      key: "5",
    },
    {
      title: "مقیاس آزمون",
      dataIndex: "MeasureName",
      key: "6",
    },
    {
      title: "فعال/غیر فعال ",
      dataIndex: "IsActive",
      key: "4",
      render: (e, record) => (
        <ChangeStatus
          IsActive={record.IsActive}
          uid={record.Uid}
          url={"/TestItem/ChangeStatus"}
        />
      ),
    },
    {
      title: "جزئیات",
      key: "جزئیات",
      align: "center",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            className="text-secondary-500 font-bold"
            onClick={() => setOpenEdit(record)}
          >
            ویرایش
          </Button>
          <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => handleDelete(record)}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="text-right text-[16px] font-normal">
            لیست فاکتورهای آزمون
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={showModal}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex  ">افزودن فاکتور آزمون</span>
          </Button>
        </div>
        <Table
          className="mt-6"
          columns={columns}
          loading={ldTestItem || isMutating}
          dataSource={addIndexToData(TestItem?.records)}
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
        <EditModal
          mutate={mutate}
          editRecord={openEdit}
          setEditRecord={setOpenEdit}
        />
      </div>
      <ConfirmDeleteModal
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="مواد اولیه"
      />
    </>
  );
}
