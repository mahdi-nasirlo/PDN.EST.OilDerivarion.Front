import React from "react";
import { FormInstance, Modal, Table, Typography } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { ColumnsType } from "antd/es/table";
import { RequestMaster } from "../../../../../interfaces/requestDetail";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import GetPageRecordNumber from "../../../../../lib/getPageRecordNumber";
import CustomeTable from "../../../../../components/CustomeTable";

function BarcodeFormLockup(props: {
  form: FormInstance;
  setFilter: any;
  open: boolean;
  setOpen: (arg: boolean) => void;
  setUid: (arg: string) => void;
}) {
  const { isLoading, data } = useSWR<{
    records: RequestMaster[];
    count: number;
  }>("/RequestMaster/GetPage", (url) =>
    listFetcher(url, {
      arg: GetPageRecordNumber(),
    })
  );

  return (
    <Modal
      onOk={() => props.setOpen(false)}
      onCancel={() => props.setOpen(false)}
      open={props.open}
      title="انتخاب درخواست"
    >
      <Typography className="mb-4 font-medium">
        درخواست خود را از لیست پایین انتخاب نمایید
      </Typography>

      <CustomeTable
        setInitialData={props.setFilter}
        isLoading={isLoading}
        data={data}
        columns={columns}
      />
    </Modal>
  );
}

const columns: ColumnsType<RequestMaster> = [
  {
    title: "ردیف",
    dataIndex: "Row",
    key: "1",
  },
  {
    title: "نام شرکت",
    dataIndex: "CompanyName",
    key: "2",
  },
  {
    title: "روش تولید",
    dataIndex: "ProductionMethodName",
    key: "4",
  },
];

export default BarcodeFormLockup;
