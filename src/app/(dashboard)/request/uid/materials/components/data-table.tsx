import React, { useState } from "react";
import EditModal from "./edit-modal";
import { ColumnsType } from "antd/es/table";
import { Button, Space } from "antd";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import CustomTable from "@/components/custom-table";
import { PlusOutlined } from "@ant-design/icons";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";

export default function DataTable({ setVisibleModal }: any) {
  const [editModal, setEditModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const columns: ColumnsType<any> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      width: "5%",
    },
    {
      title: "نام مواد اولیه",
      dataIndex: "MaterialName",
    },
    {
      title: "درصد استفاده",
      dataIndex: "MaterialUsagePercentage",
      render: (value) => <>{value}%</>,
    },
    {
      title: "نام تامین کننده ماده اولیه",
      dataIndex: "MaterialSupplyName",
    },
    {
      title: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (value, record) => (
        <Space size="small">
          <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => setDeleteModal(true)}
          >
            حذف
          </Button>
          <Button
            type="link"
            className="text-secondary-500 font-bold"
            onClick={() => setEditModal(true)}
          >
            ویرایش
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        header={{
          icon: <ViewColumnsIcon />,
          text: "لیست مواد اولیه",
          actions: (
            <Button
              className="flex items-center justify-center"
              icon={<PlusOutlined width={16} height={16} />}
              type="primary"
              onClick={() => setVisibleModal(true)}
            >
              افزودن مواد اولیه
            </Button>
          ),
        }}
        setInitialData={() => { }}
        isLoading={false}
        data={data}
        columns={columns}
      />
      <EditModal editModal={editModal} setEditModal={setEditModal} />
      <ConfirmDeleteModal
        title="مواد اولیه"
        open={deleteModal}
        setOpen={setDeleteModal}
        handleDelete={() => setDeleteModal(false)}
      />
    </>
  );
}

const data = { records: [], count: 0 };

