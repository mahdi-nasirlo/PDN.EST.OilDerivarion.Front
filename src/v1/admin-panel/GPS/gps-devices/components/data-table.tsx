"use client";

import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import StatusColumn from "../../../../../../components/CustomeTable/StatusColumn";
import CustomeTable from "../../../../../../components/CustomeTable";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { Gps } from "../../../../../../interfaces/gps";
import Link from "next/link";
import useBoxOpen from "../../../../../../hooks/requestGps/useBoxOpen";
import EditModal from "./edit-modal";

export default function DataTable({
  setFilter,
  isValidating,
  isLoading,
  boxesData,
  mutate,
}: {
  setFilter: (arg: any) => void;
  isValidating: any;
  isLoading: boolean;
  boxesData:
  | {
    records: any;
    count: number;
  }
  | undefined;
  mutate: () => void;
}) {
  const openBox = useBoxOpen();

  //حذف

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Gps | null>(null);

  //ادیت
  const [recordToEdit, setRecordToEdit] = useState<Gps>();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    "/GpsDevice/Delete",
    mutationFetcher
  );
  const { trigger: code, isMutating: pass } = useSWRMutation(
    "/RequestMaster/OpenBox",
    mutationFetcher
  );

  const handleFormSubmitCode = async (values: any) => {
    const res = await code({
      uid: recordToEdit,
      code: "1234",
    });
  };

  const handleDeleteSubmit = async () => {
    const res = await trigger({ uid: recordToDelete?.uid });
    if (res) {
      await mutate();

      setIsDeleteModalVisible(false);
    }
  };


  const columns: ColumnsType<Gps> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "کد",
      dataIndex: "code",
      key: "2",
    },
    {
      title: "ظرفیت",
      dataIndex: "capacity",
      key: "2",
    },
    {
      title: "نام استان",
      dataIndex: "stateName",
      key: "2",
    },
    {
      title: "فعال/غیر فعال ",
      dataIndex: "isActive",
      key: "3",
      render: (e, record) => <StatusColumn record={record} />,
    },
    {
      title: "مکان یابی",
      dataIndex: "confirmedRequest",
      key: "4",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            className="text-primary-500 font-bold"
          >
            <Link href={"/admin-panel/GPS/gps-devices/location-gps-device"}>
              مشاهده موقعیت
            </Link>
          </Button>
        </Space>
      ),
    },
    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            className="text-primary-500 font-bold"
            // loading={openBox.isMutating}
            onClick={() => openBox.trigger()}
          >
            بازکردن درب دستگاه
          </Button>
          <Button
            type="link"
            className="text-secondary-500 font-bold"
            onClick={() => {
              setIsEditModalVisible(true);
              setRecordToEdit(record);
            }}
          >
            ویرایش
          </Button>
          {/* <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => {
              setIsDeleteModalVisible(true);
              setRecordToDelete(record);
            }}
          >
            حذف
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <CustomeTable
        setInitialData={setFilter}
        isLoading={isLoading || isMutating || isValidating}
        data={boxesData}
        columns={columns}
      />
      {/* جذف */}
      <ConfirmDeleteModal
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleDeleteSubmit}
        title={"حذف جعبه"}
        loading={isMutating}
      />
      {/* ویرایش */}
      <EditModal
        recordeToEdit={recordToEdit}
        setModalVisible={setIsEditModalVisible}
        modalVisible={isEditModalVisible}
        mutate={mutate}
      />
    </>
  );
}
