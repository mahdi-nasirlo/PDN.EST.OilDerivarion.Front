import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import React, { useState } from "react";
import { GetPageEmployee } from "../../../../../../interfaces/Base-info";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";
import EditModal from "./edit-modal";

export default function DataTable({
  isValidating,
  MainMember,
  ldMainMember,
  mutate,
}: {
  isValidating: any;
  MainMember: any;
  ldMainMember: any;
  mutate: () => void;
}) {
  //حذف

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<GetPageEmployee | null>(
    null
  );

  const handleDelete = (record: any) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const { trigger: DeleteMember, isMutating: ldDeleteMember } = useSWRMutation(
    "/Producer/DeleteMember",
    mutationFetcher
  );

  const handleConfirmDelete = async () => {
    const res = await DeleteMember({
      uid: recordToDelete?.uid,
    });

    await mutate();
    if (res) {
      setIsDeleteModalVisible(false);

      setRecordToDelete(null);
    }
  };

  //ادیت

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<GetPageEmployee | null>(
    null
  );

  const handleEdit = (record: any) => {
    setRecordToEdit(record);
    setIsEditModalVisible(true);
  };

  const columns: ColumnsType<GetPageEmployee> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "نام",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "3",
    },
    {
      title: "شماره ملی / اتباع",
      dataIndex: "nationalCode",
      key: "4",
    },
    {
      title: "تاریخ تولد",
      dataIndex: "birthDatePersian",
      key: "5",
    },
    {
      title: "سمت",
      dataIndex: "companyRoleName",
      key: "6",
    },
    {
      title: "شماره تماس",
      dataIndex: "currentMobile",
      key: "7",
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
            className="text-secondary-500 font-bold"
            onClick={() => {
              handleEdit(record);
            }}
          >
            ویرایش
          </Button>
          <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => {
              handleDelete(record);
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
        className="mt-6"
        columns={columns}
        dataSource={MainMember || ldDeleteMember || isValidating}
        loading={ldMainMember}
        pagination={{
          defaultPageSize: 10,
          defaultCurrent: 1,
          style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            margin: "16px 0",
          },
        }}
      />
      {/* جذف */}
      <ConfirmDeleteModal
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="عضو شرکت"
      />
      {/* ویرایش */}
      <EditModal
        mutate={mutate}
        recordToEdit={recordToEdit}
        setRecordToEdit={setRecordToEdit}
        setIsEditModalVisible={setIsEditModalVisible}
        isEditModalVisible={isEditModalVisible}
      />
    </>
  );
}
