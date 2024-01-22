import React, { useContext, useState } from "react";
import useGetPageProductRequestDetail from "../../../../../../../../hooks/requestDetail/useGetPageProductRequestDetail";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import { ColumnsType } from "antd/es/table";
import { Table, Typography } from "antd";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useCrudRequestDetailProduct from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailProduct";
import { mutate } from "swr";
import { addIndexToData } from "../../../../../../../../lib/addIndexToData";

const ProductRequestTable = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string>();

  const processController = useContext(StepContext);

  const { data, isLoading } = useGetPageProductRequestDetail(
    processController.requestMaster.requestMasterUid
  );

  const tableColumns: ColumnsType<any> = [
    {
      title: "ردیف",
      key: "1",
      dataIndex: "Row",
      width: "5%",
    },
    {
      title: " نام محصول",
      key: "2",
      dataIndex: "ProductName",
    },
    {
      title: "درصد استحصال",
      key: "3",
      dataIndex: "ProductUsageExploitation",
      render: (value) => <>{value}%</>,
    },
    {
      title: "درصد هدر رفت",
      key: "4",
      dataIndex: "ProductUsageWasted",
      render: (value) => <>{value}%</>,
    },
    {
      title: "عملیات",
      key: "3",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (value, record) => (
        <Typography
          onClick={() => {
            setIsDeleteModalVisible(true);
            setRecordToDelete(record.Uid);
          }}
          className="text-red-500 cursor-pointer font-bold"
        >
          حذف
        </Typography>
      ),
    },
  ];

  const deleteRequest = useCrudRequestDetailProduct();

  const handleDelete = async () => {
    await deleteRequest.delete.trigger({ uid: recordToDelete });

    await mutate("/RequestDetail/GetAllProduct");

    setIsDeleteModalVisible(false);
  };

  return (
    <>
      <Table
        dataSource={addIndexToData(data)}
        loading={isLoading}
        className="mt-3 mb-1"
        columns={tableColumns}
        pagination={false}
      />
      <ConfirmDeleteModal
        title="محصول"
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleDelete}
        loading={deleteRequest.delete.isLoading}
      />
    </>
  );
};

export default ProductRequestTable;
