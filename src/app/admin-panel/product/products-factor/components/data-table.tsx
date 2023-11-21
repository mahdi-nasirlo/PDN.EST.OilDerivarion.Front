import { Button, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { TableColumnsType } from "antd/lib";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { Product, ProductTestItem } from "../../../../../../interfaces/product";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import CustomeTable from "../../../../../../components/CustomeTable";
import { addAlphabetToData } from "../../../../../../lib/addAlphabetToData";

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
    title: "فاکتور های آزمون",
    dataIndex: "TestItems",
    key: "3",
    render: (_, record) => (
      <Typography.Text
        className=" max-w-[300px]"
        ellipsis={true}
        style={{ width: "40px !important" }}
      >
        {record.TestItems}
      </Typography.Text>
    ),
  },
];

const DataTable = ({
  setFilter,
  product,
  ldProduct,
  mutate: TableMutate
}: {
  setFilter: (arg: any) => void,
  product: { records: Product[], count: number } | undefined;
  ldProduct: boolean;
  mutate: () => void;
}) => {
  const [activeExpRow, setActiveExpRow] = useState<string[]>();

  return (
    <>
      <CustomeTable
        setInitialData={setFilter}
        isLoading={ldProduct}
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
            <ExpandedRowRender product={record} TableMutate={TableMutate} />
          ),
        }}
      />
    </>
  );
};

const ExpandedRowRender = ({ product, TableMutate }: { product: Product, TableMutate: () => void }) => {
  const [activeExpRow, setActiveExpRow] = useState<string[]>();

  const [open, setOpen] = useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState<
    ProductTestItem | undefined
  >();

  const defaultValue = {
    productUid: product.Uid,
    testItemUid: null,
    IsActive: null,
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
    const res = await trigger({ uid: recordToDelete?.Uid });
    if (res) {
      await TableMutate();

      await mutate();
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      mutate();
    }
  }, [product]);

  const expandColumns: TableColumnsType<ProductTestItem> = [
    { title: "#", dataIndex: "Row", key: "1", width: "5%" },
    { title: "نام فاکتور آزمون", dataIndex: "TestItemName", key: "2" },
    {
      title: "عملیات",
      dataIndex: "2",
      key: "upgradeNum",
      align: "center",
      fixed: "right",
      width: "10%",
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
        dataSource={addAlphabetToData(data)}
        expandable={{
          expandedRowKeys: activeExpRow,
        }}
        loading={isLoading || isMutating}
        pagination={false}
      />
      <ConfirmDeleteModal
        loading={isMutating}
        open={open}
        setOpen={setOpen}
        handleDelete={deleteProductFactor}
        title="فاکتور آزمون محصول"
      />
    </>
  );
};

export default DataTable;
