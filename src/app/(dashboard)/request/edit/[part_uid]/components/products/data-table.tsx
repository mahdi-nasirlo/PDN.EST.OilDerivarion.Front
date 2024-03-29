import React from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import {ColumnsType} from "antd/es/table";
import {Button, Col, Space, Typography} from "antd";
import CustomTable from "@/components/custom-table";
import {ViewColumnsIcon} from "@heroicons/react/24/outline";
import {PlusOutlined} from "@ant-design/icons";
import {z} from "zod";
import useUiRequestPackageProductList
  from "@/app/(dashboard)/request/edit/[part_uid]/hook/use-ui-request-package-product-list";

interface TProps {
  uid: string;
  package_uid?: string;
  setVisibleModal: (arg: any) => void;
}

export default function DataTable({
  setVisibleModal,
  uid,
  package_uid,
}: TProps) {
  const { productDelete, products, deleteModal, setDeleteModal, handleDelete } =
    useUiRequestPackageProductList(uid, package_uid);

  const columns: ColumnsType<z.infer<typeof products.item>> = [
    {
      title: "ردیف",
      key: "1",
      dataIndex: "Row",
      width: "5%",
    },
    {
      title: " نام محصول",
      key: "2",
      dataIndex: "name",
    },
    {
      title: "درصد استحصال",
      key: "3",
      dataIndex: "Estehsal",
      render: (value) => <>{value}%</>,
    },
    {
      title: "درصد هدر رفت",
      key: "4",
      dataIndex: "HadarRaft",
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
            onClick={() => setDeleteModal(record.UID)}
          >
            حذف
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
          text: " لیست محصولات",
          discretion: <Typography className={"text-gray-500 font-normal"}>( مجموع درصد استحصال و هدر رفت باید 100
            باشد)</Typography>,
          actions: (
              <Col xs={24} xxl={3} md={6} sm={8}>
                <Button
                    className="flex items-center justify-center w-full"
              icon={<PlusOutlined width={16} height={16} />}
              type="primary"
              size="large"
              onClick={() => setVisibleModal(true)}
            >
              افزودن محصول
            </Button>
              </Col>
          ),
        }}
        isLoading={products.isFetching}
        data={{ records: products.data }}
        pagination={false}
        columns={columns}
      />
      {/*<EditModal editModal={editModal} setEditModal={setEditModal}/>*/}
      <ConfirmDeleteModal
        title="محصول"
        open={typeof deleteModal == "string"}
        setOpen={setDeleteModal}
        loading={productDelete.isPending}
        handleDelete={handleDelete}
      />
    </>
  );
}
