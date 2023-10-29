"use client";

import {PlusIcon} from "@heroicons/react/24/outline";
import {Button, Space, Tag, Typography} from "antd";
import {useForm} from "antd/es/form/Form";
import {ColumnsType} from "antd/es/table";
import React, {useEffect, useState} from "react";
import {Product} from "../../../../../../interfaces/product";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import EditModal from "@/app/admin-panel/product/products-list/components/edit-modal";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import CustomeTable from "../../../../../../components/CustomeTable";

export default function DataTable({
                                    setFilter,
                                    setModalVisible,
                                    ldProduct,
                                    product,
                                    mutate,
                                  }: {
  setFilter: (arg: any) => void;
  setModalVisible: any;
  ldProduct: boolean;
  mutate: () => void;
  product: { records: Product[], count: number } | undefined;
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
      dataIndex: "IsActive",
      key: "4",
      render: (_, record: any) => {
        let color = "";
        let name = "";
        let icon = <></>;
        if (record.IsActive === false) {
          color = "red";
          name = "غیرفعال";
          icon = <CloseCircleOutlined />
        } else {
          color = "success";
          name = "فعال";
          icon = <CheckCircleOutlined />
        }

        return <Tag icon={icon} color={color}>{name}</Tag>;
      },
    },
    {
      title: "فاکتور آزمون",
      dataIndex: "TestItems",
      key: "5",
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
            <PlusIcon width={24} height={24}/>
            <span className="flex gap-2">افزودن محصول جدید</span>
          </Button>
        </div>
        <CustomeTable setInitialData={setFilter} isLoading={ldProduct || ldDelete} data={product} columns={columns}/>
      </div>
      {/* جذف */}
      <ConfirmDeleteModal
        loading={ldDelete}
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="محصول"
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
