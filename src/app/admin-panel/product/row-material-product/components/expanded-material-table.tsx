import {Product} from "../../../../../../interfaces/product";
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import {TableColumnsType} from "antd/lib";
import {Button, Space, Table} from "antd";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";
import {addAlphabetToData} from "../../../../../../lib/addAlphabetToData";

export const ExpandedMaterialTable = ({product, mutate: mutateTable}: { product: Product, mutate: any }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [recordToDelete, setRecordToDelete] = useState<Product>();

  const defaultValue = {
    productUid: product.Uid,
    materialUid: null,
    IsActive: null,
  };

  const { data, isLoading, mutate } = useSWR<any[]>(
    ["/ProductMaterial/GetAll", defaultValue],
    ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
  );

  useEffect(() => {
    if (!isLoading) {
      mutate();
    }
  }, [product]);

  const { trigger, isMutating } = useSWRMutation(
    "/ProductMaterial/Delete",
    mutationFetcher
  );

  const handleDelete = async () => {

    await trigger({ Uid: recordToDelete?.Uid });

    await mutate();
    await mutateTable();

    setOpen(false);
  };

  const expandColumns: TableColumnsType<any> = [
    {
      title: "#",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "نام ماده اولیه",
      dataIndex: "MaterialName",
      key: "2",
    },
    {
      title: "عملیات",
      dataIndex: "2",
      key: "upgradeNum",
      align: "center",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Space size="small">
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
            loading={isLoading || isMutating}
            pagination={false}
        />
        <ConfirmDeleteModal
            loading={isMutating}
            open={open}
            setOpen={setOpen}
            handleDelete={handleDelete}
            title={"فاکتور محصول"}
        />
      </>
  );
};
