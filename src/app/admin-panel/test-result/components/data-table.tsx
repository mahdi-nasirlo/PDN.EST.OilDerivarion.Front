import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import Link from "next/link";
import React from "react";
import { addIndexToData } from "../../../../../lib/addIndexToData";

interface DataType {
  key: string;
  Row: number;
  Barcode: string;
  status: string;
}

export default function DataTable({
  ldTestResult,
  TestResult,
  mutate,
}: {
  ldTestResult: boolean;
  mutate: () => void;
  TestResult:
  | {
    records: any[];
    count: number;
  }
  | undefined;
}) {
  const columns: ColumnsType<DataType> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%"
    },
    {
      title: "بار کد",
      dataIndex: "Barcode",
      key: "2",
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "3",
    },
    {
      title: "نام فاکتور",
      dataIndex: "TestItemName",
      key: "4",
    },
    {
      title: "تجدید پذیری",
      dataIndex: "TestItemReNewabillity",
      key: "5",
    },
    {
      title: "مقدار تجدید پذیری",
      dataIndex: "TestItemReNewabillityValue",
      key: "6",
    },
    {
      title: "نام آزمایشگاه",
      dataIndex: "LabName",
      key: "7",
    },
    {
      title: "نتیجه",
      dataIndex: "Result",
      key: "8",
    },
    {
      title: "محدوده",
      dataIndex: "Range",
      key: "9",
    },
    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record: any) => (
        <Space size="small">
          <Link
            href={`/admin-panel/test-result-record/${record.TestItemUid}`}
            className="text-secondary-500 font-bold"
          >
            ثبت نتیجه
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="box-border w-full mt-8 p-6">
      <Table
        loading={ldTestResult}
        className="mt-6"
        columns={columns}
        dataSource={addIndexToData(TestResult?.records)}
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
    </div>
  );
}
