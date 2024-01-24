"use client";

import { Button, Space, Typography } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { CreateTestItemDetail, TestItemDetail, } from "../../../../../interfaces/TestItem";
import EditModal from "./edit-modal";
import CustomeTable from "../../../../../components/CustomeTable";
import StatusColumn from "../../../../../components/CustomeTable/StatusColumn";

export default function DataTable({
  setModalVisible,
  testItemDetail,
  ldTestItemDetail,
  setFilter,
  mutate,
}: {
  setFilter: (e: any) => void,
  setModalVisible: any;
  testItemDetail: {
    records: any[];
    count: number;
  } | undefined;
  ldTestItemDetail: boolean;
  mutate: () => void;
}) {
  //حذف

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<TestItemDetail | null>(
    null
  );

  const handleDelete = (record: TestItemDetail) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const { trigger: deleteLab, isMutating: IsDeleteTF } = useSWRMutation(
    "/TestItemDetail/Delete",
    mutationFetcher
  );

  const handleConfirmDelete = async () => {
    const res = await deleteLab({ Uid: recordToDelete?.uid });

    if (res) {
      await mutate();

      setIsDeleteModalVisible(false);

      setRecordToDelete(null);
    }
  };


  const [isVisibleEditModal, setIsEditModalVisible] = useState<boolean>(false);
  const [recordToEdit, setRecordToEdit] = useState<CreateTestItemDetail | null>(null);

  const handleEdit = (record: CreateTestItemDetail) => {
    setRecordToEdit(record);
    setIsEditModalVisible(true);
  };

  const columns: ColumnsType<any> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%"
    },
    {
      title: "عنوان استاندارد",
      dataIndex: "title",
      key: "2",
    },
    {
      title: "فاکتورهای آزمون",
      dataIndex: "testItemName",
      key: "3",
    },
    {
      title: "شناسه استاندارد",
      dataIndex: "referenceCode",
      key: "4",
    },
    {
      title: "فعال/غیر فعال",
      dataIndex: "isActive",
      key: "4",
      render: (_, record: any) => <StatusColumn record={record} />
    },
    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record: any) => (
        <Space size="small">
          <Button
            type="link"
            className="text-secondary-500 font-bold"
            onClick={() => handleEdit(record)}
          >
            ویرایش
          </Button>
          {/* <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => handleDelete(record)}
          >
            حذف
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="text-right text-[16px] font-normal">
            لیست استانداردهای آزمون
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={() => setModalVisible(true)}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex">افزودن استاندارد آزمون</span>
          </Button>
        </div>
        <CustomeTable
          columns={columns}
          setInitialData={setFilter}
          isLoading={ldTestItemDetail || IsDeleteTF}
          data={testItemDetail}
        />
      </div>
      {/* جذف */}
      <ConfirmDeleteModal
        loading={IsDeleteTF}
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="استاندارد آزمون"
      />
      {/* ویرایش */}
      <EditModal
        mutate={mutate}
        recordToEdit={recordToEdit}
        setRecordToEdit={setRecordToEdit}
        isEditModalVisible={isVisibleEditModal}
        setIsEditModalVisible={setIsEditModalVisible}
      />
    </>
  );
}