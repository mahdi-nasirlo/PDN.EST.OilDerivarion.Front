"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Category } from "../../../../../../interfaces/category";
import { addIndexToData } from "../../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import EditModal from "@/app/admin-panel/product/category-list/components/edit-modal";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function DataTable({
  isValidating,
  setModalVisible,
  category,
  ldCategory,
  mutate,
}: {
  isValidating: any;
  setModalVisible: any;
  category: Category[] | undefined;
  mutate: () => void;
  ldCategory: boolean;
}) {
  //حذف

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Category | null>(null);

  const { trigger: deleteCategory, isMutating: ldDelete } = useSWRMutation(
    "/ProductCategory/Delete",
    mutationFetcher
  );

  const handleDelete = async () => {

    await deleteCategory({
      uid: recordToDelete?.Uid,
    });

    await mutate();

    setIsDeleteModalVisible(false);

    setRecordToDelete(null);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const [isVisibleEditModal, setIsEditModalVisible] = useState<boolean>(false);
  const [recordToEdit, setRecordToEdit] = useState<Category | null>(null);

  const columns: ColumnsType<Category> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "نام دسته بندی",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "روش تولید",
      dataIndex: "TestMethodName",
      key: "3",
    },
    {
      title: "دانسیته",
      dataIndex: "HasDensity",
      key: "4",
      render: (_, record: any) => {
        let color = "";
        let name = "";
        if (record.HasDensity === false) {
          color = "orange";
          name = "ندارد";
        } else {
          color = "blue";
          name = "دارد";
        }

        return <Tag color={color}>{name}</Tag>;
      },
    },
    {
      title: "حداقل بازه دانسیته",
      dataIndex: "DensityLowerLimit",
      key: "5",
      render: (_, record: any) => {
        if (record.DensityLowerLimit === null) {
          return <Typography>_</Typography>;
        }

        return <Typography>{record.DensityLowerLimit}</Typography>;
      },
    },
    {
      title: "حداکثر بازه دانسیته",
      dataIndex: "DensityUpperLimit",
      key: "6",
      render: (_, record: any) => {
        if (record.DensityUpperLimit === null) {
          return <Typography>_</Typography>;
        }

        return <Typography>{record.DensityUpperLimit}</Typography>;
      },
    },
    {
      title: "فعال/غیر فعال ",
      dataIndex: "ConfirmedRequestCode",
      key: "7",
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
              setRecordToEdit(record);
              setIsEditModalVisible(true);
            }}
          >
            ویرایش
          </Button>
          <Button
            type="link"
            className={"text-red-500 font-bold"}
            onClick={() => {
              setIsDeleteModalVisible(true);
              setRecordToDelete(record);
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
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست دسته بندی محصولات
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            onClick={showModal}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex ">افزودن دسته بندی</span>
          </Button>
        </div>
        <Table
          className="mt-6"
          columns={columns}
          loading={ldCategory || ldDelete || isValidating}
          dataSource={addIndexToData(category)}
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
        loading={ldDelete}
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleDelete}
        title="دسته بندی محصول"
      />
      {/* ویرایش */}
      <EditModal
        mutate={mutate}
        recordToEdit={recordToEdit}
        setIsEditModalVisible={setIsEditModalVisible}
        isEditModalVisible={isVisibleEditModal}
        setRecordToEdit={setRecordToEdit}
      />
    </>
  );
}
