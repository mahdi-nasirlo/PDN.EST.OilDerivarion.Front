"use client";

import { Button, Space, Tooltip, Typography } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Product } from "../../../../../../interfaces/product";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import CustomeTable from "../../../../../../components/CustomeTable";
import { ExpandedMaterialTable } from "@/app/admin-panel/product/row-material-product/components/expanded-material-table";
import StatusColumn from "../../../../../../components/CustomeTable/StatusColumn";

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
    const res = await deleteProduct({ uid: recordToDelete?.Uid });

    if (res) {
      await mutate();

      setIsDeleteModalVisible(false);
    }
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
      render: (_, record: any) => <StatusColumn record={record} />
    },

    {
      title: "مواد اولیه",
      dataIndex: "Materials",
      key: "5",
      render: (_, record) => (
        <Tooltip
          placement="top"
          title={<Typography>{record.Materials}</Typography>}
        >
          <Typography.Text
            className=" max-w-[200px]"
            ellipsis={true}
            style={{ width: "40px !important" }}
          >
            {record.Materials}
          </Typography.Text>
        </Tooltip>
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
    // {
    //   title: "عملیات",
    //   key: "عملیات",
    //   align: "center",
    //   fixed: "right",
    //   width: "10%",
    //   render: (_, record) => (
    //     <Space size="small">
    //       <button
    //         className="text-red-500 font-bold py-1 px-5"
    //         onClick={() => handleDelete(record)}
    //       >
    //         حذف
    //       </button>
    //     </Space>
    //   ),
    // },
  ];

  const [activeExpRow, setActiveExpRow] = useState<string[]>([]);

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست مواد اولیه محصولات
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
          rowKey={"Uid"}
          columns={columns}
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
