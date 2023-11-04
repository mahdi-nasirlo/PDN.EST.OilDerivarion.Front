import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { RequestMaster } from "../../../../../interfaces/requestMaster";

const columns: ColumnsType<RequestMaster> = [
  {
    title: "ردیف",
    dataIndex: "Row",
    key: "1",
    width: "5%"
  },
  {
    title: "نوع نمونه",
    dataIndex: "SampleTypeName",
    key: "2",
  },
  {
    title: "محل استفاده بارکد",
    dataIndex: "BarcodeUsePlaceTypeName",
    key: "3",
  },
  {
    title: "نوع ظرف",
    dataIndex: "ContainerTypeName",
    key: "4",
  },
  {
    title: "کد دستگاه GPS",
    dataIndex: "GpsDeviceCode",
    key: "5",
  },
];

const DataTable = ({
  isValidating,
  requestMaster,
  ldRequestMaster,
}: {
  isValidating: any;
  requestMaster: RequestMaster[];
  ldRequestMaster: boolean;
}) => {
  return (
    <Table
      className="mt-6"
      columns={columns}
      rowKey={"Uid"}
      loading={ldRequestMaster || isValidating}
      dataSource={requestMaster}
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

export default DataTable;
