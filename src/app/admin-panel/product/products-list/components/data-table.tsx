"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Switch, Table, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Product } from "../../../../../../interfaces/product";
import { addIndexToData } from "../../../../../../lib/addIndexToData";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import EditModal from "@/app/admin-panel/product/products-list/components/edit-modal";
import ChangeStatus from "../../../../../../components/inputs/ChangeStatus";

export default function DataTable({
  setModalVisible,
  ldProduct,
  product,
  mutate,
}: {
  setModalVisible: any;
  ldProduct: boolean;
  mutate: () => void;
  product: Product[] | undefined;
}) {
  //حذف

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Product | null>(null);

  const handleDelete = (record: Product) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const { trigger: deleteProduct, isMutating: ldDelete } = useSWRMutation(
    "/Product/Delete",
    mutationFetcher
  );

  const handleConfirmDelete = async () => {
    await deleteProduct({
      uid: recordToDelete?.Uid,
    });

    setIsDeleteModalVisible(false);

    await mutate();
  };

  const showModal = () => {
    setModalVisible(true);
  };

  //ادیت

  const [form] = useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<Product | null>(null);

  const handleEdit = (record: Product) => {
    setRecordToEdit(record);
    setIsEditModalVisible(true);
  };

  useEffect(() => {
    form.setFieldsValue(recordToEdit);
  }, [recordToEdit]);

  const columns: ColumnsType<Product> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "نام محصول",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "نام دسته بندی",
      dataIndex: "ProductCategoryName",
      key: "3",
    },
    {
      title: "فعال/غیر فعال ",
      dataIndex: "Is_Active",
      key: "4",
      render: (e, record) => (
        <ChangeStatus
          isActive={record.Is_Active}
          uid={record.Uid}
          url={"/Product/ChangeStatus"}
        />
      ),
    },
    {
      title: "کد محصول",
      dataIndex: "ConfirmedRequestCode",
      key: "5",
    },
    {
      title: "فاکتور آزمون",
      dataIndex: "ConfirmedRequestCode",
      key: "6",
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
            onClick={() => handleEdit(record)}
          >
            ویرایش
          </Button>
          <Button
            type="link"
            className={"text-red-500 font-bold"}
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
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست محصولات
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={showModal}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex gap-2">افزودن محصول جدید</span>
          </Button>
        </div>
        <Table
          loading={ldProduct || ldDelete}
          className="mt-6"
          columns={columns}
          dataSource={addIndexToData(product)}
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
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="مواد اولیه"
      />
      {/* ویرایش */}
      <EditModal
        mutate={mutate}
        recordToEdit={recordToEdit}
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
      />
    </>
  );
}
