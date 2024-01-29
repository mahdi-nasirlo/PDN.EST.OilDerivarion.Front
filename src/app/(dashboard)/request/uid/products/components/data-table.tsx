import React, { useState } from "react";
import EditModal from "./edit-modal";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { ColumnsType } from "antd/es/table";
import { Button, Space } from "antd";
import CustomTable from "@/components/custom-table";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { PlusOutlined } from "@ant-design/icons";

export default function DataTable({ setVisibleModal }: any) {
  const [editModal, setEditModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const columns: ColumnsType<any> = [
    {
      title: "ردیف",
      key: "1",
      dataIndex: "Row",
      width: "5%",
    },
    {
      title: " نام محصول",
      key: "2",
      dataIndex: "ProductName",
    },
    {
      title: "درصد استحصال",
      key: "3",
      dataIndex: "ProductUsageExploitation",
      render: (value) => <>{value}%</>,
    },
    {
      title: "درصد هدر رفت",
      key: "4",
      dataIndex: "ProductUsageWasted",
      render: (value) => <>{value}%</>,
    },
    {
      title: "عملیات",
      key: "3",
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
          text: "لیست محصولات",
          actions: (
            <Button
              className="flex items-center justify-center"
              icon={<PlusOutlined width={16} height={16} />}
              type="primary"
              onClick={() => setVisibleModal(true)}
            >
              افزودن محصول
            </Button>
          ),
        }}
        setInitialData={() => {}}
        isLoading={false}
        data={[data]}
        columns={columns}
      />
      <EditModal editModal={editModal} setEditModal={setEditModal} />
      <ConfirmDeleteModal
        title="محصول"
        open={deleteModal}
        setOpen={setDeleteModal}
        handleDelete={() => setDeleteModal(false)}
      />
    </>
  );
}

const data = null;
// {
//     records: [
//         {
//             Row: 1,
//             ProductName: 'CFO',
//             ProductUsageExploitation: '50',
//             ProductUsageWasted: '50',
//         },
//         {
//             Row: 2,
//             ProductName: 'هیدروژن',
//             ProductUsageExploitation: '50',
//             ProductUsageWasted: '50',
//         },
//     ],
//     count: 2
// }
