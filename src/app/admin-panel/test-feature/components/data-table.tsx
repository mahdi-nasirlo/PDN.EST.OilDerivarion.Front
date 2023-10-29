"use client";

import { Button, Space, Table, Tag, Typography } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import {
  CreateTestItemDetail,
  TestItemDetail,
} from "../../../../../interfaces/TestItem";
import EditModal from "./edit-modal";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function DataTable({
  setModalVisible,
  testItemDetail,
  ldTestItemDetail,
  mutate,
}: {
  setModalVisible: any;
  testItemDetail: any[] | undefined;
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
    await deleteLab({
      Uid: recordToDelete?.Uid,
    });

    await mutate();

    setIsDeleteModalVisible(false);

    setRecordToDelete(null);
  };

  //ادیت

  const [isVisibleEditModal, setIsEditModalVisible] = useState<boolean>(false);
  const [recordToEdit, setRecordToEdit] = useState<CreateTestItemDetail | null>(
    null
  );

  const handleEdit = (record: CreateTestItemDetail) => {
    setRecordToEdit(record);
    setIsEditModalVisible(true);
  };

  const columns: ColumnsType<any> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "عنوان",
      dataIndex: "Title",
      key: "2",
    },
    {
      title: "عنوان استاندارد",
      dataIndex: "TestItemName",
      key: "3",
    },
    {
      title: "مرجع",
      dataIndex: "ReferenceCode",
      key: "4",
    },
    {
      title: "فعال/غیر فعال",
      dataIndex: "IsActive",
      key: "4",
      render: (_, record: any) => {
        let color = "";
        let name = "";
        let icon = <></>;
        if (record.IsActive === false) {
          color = "red";
          name = "غیرفعال";
          icon = <CloseCircleOutlined />;
        } else {
          color = "success";
          name = "فعال";
          icon = <CheckCircleOutlined />;
        }

        return (
          <Tag icon={icon} color={color}>
            {name}
          </Tag>
        );
      },
    },
    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: 150,
      render: (_, record: any) => (
        <Space size="small">
          <Button
            type="link"
            className="text-secondary-500 font-bold"
            onClick={() => handleEdit(record)}
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
        <Table
          className="mt-6"
          loading={ldTestItemDetail || IsDeleteTF}
          columns={columns}
          dataSource={testItemDetail}
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
