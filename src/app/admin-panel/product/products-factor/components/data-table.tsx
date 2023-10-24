import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { TableColumnsType } from "antd/lib";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { Product, ProductTestItem } from "../../../../../../interfaces/product";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { addIndexToData } from "../../../../../../lib/addIndexToData";

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
    title: "فاکتور های آزمون",
    dataIndex: "TestItems",
    key: "3",
  },
];

const DataTable = ({
  product,
  ldProduct,
}: {
  product: Product[];
  ldProduct: boolean;
}) => {
  const [activeExpRow, setActiveExpRow] = useState<string[]>();

  return (
    <Table
      className="mt-6"
      columns={columns}
      rowKey={"Uid"}
      loading={ldProduct}
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
          <ExpandedRowRender product={record} />
        ),
      }}
      dataSource={product}
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
  );
};

const ExpandedRowRender = ({ product }: { product: Product }) => {
  const [activeExpRow, setActiveExpRow] = useState<string[]>();

  const [open, setOpen] = useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState<
    ProductTestItem | undefined
  >();

  const defaultValue = {
    productUid: product.Uid,
    testItemUid: null,
    IsActive: true,
  };

  const { data, isLoading, mutate } = useSWR<ProductTestItem[]>(
    ["/ProductTestItem/GetAll", defaultValue],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
  );

  const { trigger, isMutating } = useSWRMutation(
    "/ProductTestItem/Delete",
    mutationFetcher
  );

  const deleteProductFactor = async () => {
    await trigger({ uid: recordToDelete?.Uid });

    await mutate();

    setOpen(false);
  };

  useEffect(() => {
    if (!isLoading) {
      mutate();
    }
  }, [product]);

  const expandColumns: TableColumnsType<ProductTestItem> = [
    { title: "#", dataIndex: "Row", key: "1" },
    { title: "نام فاکتور", dataIndex: "TestItemName", key: "2" },
    {
      title: "عملیات",
      dataIndex: "2",
      key: "upgradeNum",
      align: "center",
      fixed: "right",
      width: 150,
      render: (_, record: ProductTestItem) => (
        <Space size="middle">
          <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => {
              setOpen(true);
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
      <Table
        columns={expandColumns}
        dataSource={addIndexToData(data)}
        expandable={{
          expandedRowKeys: activeExpRow,
        }}
        loading={isLoading || isMutating}
        pagination={false}
      />
      <ConfirmDeleteModal
        open={open}
        setOpen={setOpen}
        handleDelete={deleteProductFactor}
        title={"فاکتور محصول"}
      />
    </>
  );
};

export default DataTable;
