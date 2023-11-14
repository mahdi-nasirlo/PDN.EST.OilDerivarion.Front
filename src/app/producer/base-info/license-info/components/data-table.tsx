import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { GerPagePresonLicence } from "../../../../../../interfaces/Base-info";
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
    useState<GerPagePresonLicence | null>(null);

  const handleDelete = (record: any) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const { trigger: DeleteLicense, isMutating: ldDeleteLicense } =
    useSWRMutation("/ProfilePersonLicense/Delete", mutationFetcher);

  const handleConfirmDelete = async () => {
    console.log(recordToDelete);

    const res = await DeleteLicense({
      uid: recordToDelete?.Uid,
    });

    await mutate();
    if (res) {
      setIsDeleteModalVisible(false);

      setRecordToDelete(null);
    }
  };

  //ادیت

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<GerPagePresonLicence | null>(
    null
  );

  const handleEdit = (record: any) => {
    setRecordToEdit(record);
    setIsEditModalVisible(true);
  };

  const columns: ColumnsType<GerPagePresonLicence> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "نام سند",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "شماره سند",
      dataIndex: "number",
      key: "7",
    },
    {
      title: "نوع مجوز",
      dataIndex: "licenseTypeName",
      key: "3",
    },
    {
      title: "صادر کننده",
      dataIndex: "exporter",
      key: "4",
    },
    {
      title: "تاریخ صدور",
      dataIndex: "issueDatePersian",
      key: "5",
    },
    {
      title: "تاریخ انقضاء",
      dataIndex: "expirationDatePersian",
      key: "6",
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
        loading={ldMainMember || ldDeleteLicense || isValidating}
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
        title="مجوز"
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
