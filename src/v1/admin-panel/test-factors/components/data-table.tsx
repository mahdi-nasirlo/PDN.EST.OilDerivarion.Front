"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { TestItem } from "../../../../../interfaces/TestItem";
import EditModal from "../components/edit-modal";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import StatusColumn from "../../../../../components/CustomeTable/StatusColumn";
import CustomeTable from "../../../../../components/CustomeTable";

export default function DataTable({
  setModalVisible,
  ldTestItem,
  TestItem,
  mutate,
  setFilter
}: {
  setFilter: (arg: any) => void;
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


  //ادیت
  const [openEdit, setOpenEdit] = useState<TestItem | undefined>(undefined);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<TestItem | null>(null);

  const handleDelete = (record: TestItem) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const { trigger, isMutating: IsDeleteTestFactor } = useSWRMutation(
    "/TestItem/Delete",
    mutationFetcher
  );

  const handleConfirmDelete = async () => {
    const res = await trigger({ uid: recordToDelete?.uid });
    if (res) {
      await mutate();
      setIsDeleteModalVisible(false);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const columns: ColumnsType<TestItem> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%"
    },
    {
      title: "نام فاکتور آزمون",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "واحد اندازه گیری",
      dataIndex: "measureName",
      key: "3",
    },
    {
      title: "فعال/غیر فعال ",
      dataIndex: "isActive",
      key: "4",
      render: (e, record) => <StatusColumn record={record} />
    },
    {
      title: "مدت زمان انجام آزمایش",
      dataIndex: "testDuration",
      key: "5",
      render: (_, record: TestItem) => {
        return (
          <Typography.Text>
            {record.testDuration !== undefined && record.testDuration !== null
              ? `${record.testDuration} ساعت`
              : 'تعریف نشده'}
          </Typography.Text>
        );
      },
    },
    {
      title: "جزئیات",
      key: "جزئیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            className="text-secondary-500 font-bold"
            onClick={() => setOpenEdit(record)}
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
        <CustomeTable
          setInitialData={setFilter}
          columns={columns}
          isLoading={ldTestItem || IsDeleteTestFactor}
          data={TestItem}
        />
        <EditModal
          setModalVisible={setModalVisible}
          mutate={mutate}
          recordToEdit={openEdit}
          setRecordToEdit={setOpenEdit}
        />
      </div>
      <ConfirmDeleteModal
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="فاکتور آزمون"
        loading={IsDeleteTestFactor}
      />
    </>
  );
}