"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Tag, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Product } from "../../../../../../interfaces/product";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import CustomeTable from "../../../../../../components/CustomeTable";
import { ExpandedMaterialTable } from "@/app/admin-panel/product/row-material-product/components/expanded-material-table";

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
  product:
  | {
    records: Product[];
    count: number;
  }
  | undefined;
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
    await mutate();

    setIsDeleteModalVisible(false);

  };

  const columns: ColumnsType<any> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%"
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
      title: "مواد اولیه",
      dataIndex: "Materials",
      key: "5",
      render: (_, record) => (
        <Typography.Text
          className=" max-w-[200px]"
          ellipsis={true}
          style={{ width: "40px !important" }}
        >
          {record.Materials}
        </Typography.Text>
      ),
    },
    {
      title: "فاکتورهای آزمون",
      dataIndex: "TestItems",
      key: "6",
      render: (_, record) => (
        <Tooltip
          placement="top"
          title={<Typography>{record.TestItems}</Typography>}
        >
          <Typography.Text
            className=" max-w-[200px]"
            ellipsis={true}
            style={{ width: "40px !important" }}
          >
            {record.TestItems}
          </Typography.Text>
        </Tooltip>
      ),
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
            className="text-red-500 font-bold"
            onClick={() => handleDelete(record)}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  const [activeExpRow, setActiveExpRow] = useState<string[]>([]);

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست ماده اولیه محصول
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={() => setModalVisible(true)}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex gap-2">افزودن ماده اولیه محصول</span>
          </Button>
        </div>
        <CustomeTable
          setInitialData={setFilter}
          isLoading={ldProduct || ldDelete}
          data={product}
          columns={columns}
          rowKey={"Uid"}
          expandable={{
            expandedRowKeys: activeExpRow,
            onExpand: (expanded, record: Product) => {
              const keys: string[] = [];

              if (expanded && record.Uid) {
                // @ts-ignore
                keys.push(record.Uid);
              }

              if (!expanded) {
                keys.pop();
              }

              setActiveExpRow(keys);
            },
            expandedRowRender: (record: Product) => (
              <ExpandedMaterialTable product={record} mutate={mutate} />
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
        title="ماده اولیه محصول"
      />
    </>
  );
}
