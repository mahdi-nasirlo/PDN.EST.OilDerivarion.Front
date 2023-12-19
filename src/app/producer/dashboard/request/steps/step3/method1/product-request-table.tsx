import React, { useContext, useState } from "react";
import useGetPageProductRequestDetail from "../../../../../../../../hooks/requestDetail/useGetPageProductRequestDetail";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import { ColumnsType } from "antd/es/table";
import { Table, Typography } from "antd";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useCrudRequestDetailProduct from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailProduct";
import { mutate } from "swr";

const ProductRequestTable = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string>();

  const processController = useContext(StepContext);

  const { data, isLoading } = useGetPageProductRequestDetail(
    processController.requestMaster.requestMasterUid
  );
  const method = processController.requestMaster.productionMethodId;

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
          className="text-red-500 cursor-pointer"
        >
          حذف
        </Typography>
      ),
    },
  ];

  const deleteRequest = useCrudRequestDetailProduct();

  const handleDelete = async () => {
    setIsDeleteModalVisible(false);

    await deleteRequest.delete.trigger({ uid: recordToDelete });

    await mutate("/RequestDetail/GetAllProduct");
  };

  return (
    <>
      <Table
        dataSource={data}
        loading={isLoading}
        className="mt-3"
        columns={tableColumns}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: false,
          defaultCurrent: 1,
          style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            margin: "16px 0",
          },
        }}
      />
      <ConfirmDeleteModal
        title="محصول"
        open={isDeleteModalVisible}
        setOpen={() => setIsDeleteModalVisible(true)}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default ProductRequestTable;
