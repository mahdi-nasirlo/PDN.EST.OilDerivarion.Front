"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Tooltip, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Product } from "../../../../../../interfaces/product";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import EditModal from "@/app/admin-panel/product/products-list/components/edit-modal";
import CustomeTable from "../../../../../../components/CustomeTable";
import StatusColumn from "../../../../../../components/CustomeTable/StatusColumn";
import TestExpandedRowRender from "./test-expandedRowRender";

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
  product: { records: Product[]; count: number } | undefined;
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
    const res = await deleteProduct({ uid: recordToDelete?.uid });

    if (res) {
      setIsDeleteModalVisible(false);

      await mutate();
    }
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
    const newDataTestItems = recordToEdit?.testItems?.map((itemTestItems) => {
      return itemTestItems.uid;
    });
    const newDataMaterials = recordToEdit?.materials?.map((itemMaterials) => {
      return itemMaterials.uid;
    });

    form.setFieldsValue({
      ...recordToEdit,
      testItems: newDataTestItems,
      materials: newDataMaterials,
    });
  }, [recordToEdit]);

  const columns: ColumnsType<Product> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "نام محصول",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "نام دسته بندی",
      dataIndex: "productCategoryName",
      key: "3",
    },
    {
      title: "فعال/غیر فعال ",
      dataIndex: "isActive",
      key: "4",
      render: (_, record) => <StatusColumn record={record} />,
    },
    {
      title: "مواد اولیه",
      dataIndex: "materials",
      key: "5",
      render: (_, record: Product) => {
        let materialsNames = record.materials
          ?.map((item) => item.name)
          .join(", ");

        return (
          <Tooltip
            placement="top"
            title={<Typography>{materialsNames}</Typography>}
          >
            <Typography.Text
              className="max-w-[180px]"
              ellipsis={true}
              style={{ width: "40px !important" }}
            >
              {materialsNames}
            </Typography.Text>
          </Tooltip>
        );
      },
    },
    {
      title: "فاکتور های آزمون",
      dataIndex: "testItems",
      key: "6",
      render: (_, record: Product) => {
        let testItemNames = record.testItems
          ?.map((item) => item.name)
          .join(", ");

        return (
          <Tooltip
            placement="top"
            title={<Typography>{testItemNames}</Typography>}
          >
            <Typography.Text
              className="max-w-[180px]"
              ellipsis={true}
              style={{ width: "40px !important" }}
            >
              {testItemNames}
            </Typography.Text>
          </Tooltip>
        );
      },
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

  const [activeExpRow, setActiveExpRow] = useState<string[]>();

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
            <span className="flex gap-2">افزودن محصول</span>
          </Button>
        </div>
        <CustomeTable
          setInitialData={setFilter}
          isLoading={ldProduct || ldDelete}
          data={product}
          columns={columns}
          rowKey={"uid"}
          expandable={{
            expandedRowKeys: activeExpRow,
            onExpand: (expanded, record: Product) => {
              const keys: string[] = [];
              if (expanded && record.uid) {
                // @ts-ignore
                keys.push(record.uid);
              }
              if (!expanded) {
                keys.pop();
              }
              setActiveExpRow(keys);
            },
            expandedRowRender: (record: Product) => (
              <TestExpandedRowRender TableMutate={mutate} product={record} />
            ),
          }}
        />
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
