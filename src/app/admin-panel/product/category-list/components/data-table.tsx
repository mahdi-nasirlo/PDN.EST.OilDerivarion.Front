"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Category } from "../../../../../../interfaces/category";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import EditModal from "@/app/admin-panel/product/category-list/components/edit-modal";
import CustomeTable from "../../../../../../components/CustomeTable";
import StatusColumn from "../../../../../../components/CustomeTable/StatusColumn";

export default function DataTable({
  setFilter,
  isValidating,
  setModalVisible,
  category,
  ldCategory,
  mutate,
}: {
  setFilter: (arg: any) => void,
  isValidating: any;
  setModalVisible: any;
  category: { records: Category[], count: number } | undefined;
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

    const res = await deleteCategory({ uid: recordToDelete?.Uid });

    if (res) {

      await mutate();

      setIsDeleteModalVisible(false);
    }
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
      width: "5%"
    },
    {
      title: "نام دسته بندی",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "روش تولید",
      dataIndex: "ProductionMethodName",
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
      render: (_, record) => <StatusColumn record={record} />
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
              setRecordToEdit(record);
              setIsEditModalVisible(true);
            }}
          >
            ویرایش
          </Button>
          {/* <Button
            type="link"
            className={"text-red-500 font-bold"}
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
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست دسته بندی ها
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
        <CustomeTable
          setInitialData={setFilter}
          isLoading={ldCategory || ldDelete || isValidating}
          data={category}
          columns={columns}
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
