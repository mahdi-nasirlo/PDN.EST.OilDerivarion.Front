import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { RequestMaster } from "../../../../../interfaces/requestMaster";
import CustomeTable from "../../../../../components/CustomeTable";

const columns: ColumnsType<RequestMaster> = [
  {
    title: "ردیف",
    dataIndex: "Row",
    key: "1",
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
  setFilter,
  isValidating,
  requestMaster,
  ldRequestMaster,
}: {
  setFilter: any;
  isValidating: any;
  requestMaster:
    | {
        records: RequestMaster[];
        count: number;
      }
    | undefined;
  ldRequestMaster: boolean;
}) => {
  return (
    <CustomeTable
      setInitialData={setFilter}
      isLoading={ldRequestMaster || isValidating}
      data={requestMaster}
      columns={columns}
    />
  );
};

export default DataTable;
