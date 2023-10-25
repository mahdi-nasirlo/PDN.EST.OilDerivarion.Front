import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { GetPageMainMember } from "../../../../../../interfaces/Base-info";
import EditModal from "./edit-modal";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import useSWRMutation from "swr/mutation";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";

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
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] =
    useState<GetPageMainMember | null>(null);

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
  const [recordToEdit, setRecordToEdit] = useState<GetPageMainMember | null>(
    null
  );

  const handleEdit = (record: any) => {
    setRecordToEdit(record);
    setIsEditModalVisible(true);
  };

  const columns: ColumnsType<GetPageMainMember> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
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
      title: "کد ملی / اتباع",
      dataIndex: "nationalCode",
      key: "4",
    },
    {
      title: "تاریخ تولد",
      dataIndex: "birthDate",
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
      width: 150,
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
        loading={ldMainMember || ldDeleteMember || isValidating}
        className="mt-6"
        columns={columns}
        dataSource={MainMember}
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
      {/* جذف */}
      <ConfirmDeleteModal
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="مدیر شرکت"
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
