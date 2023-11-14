import { Space, Switch, Table, Typography } from "antd";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { listFetcher } from "../../../../../../../lib/server/listFetcher";
import { ColumnsType } from "antd/es/table";
import { RequestList } from "../../../../../../../interfaces/requestDetail";
import { addIndexToData } from "../../../../../../../lib/addIndexToData";
import { Product } from "../../../../../../../interfaces/product";

export default function PrimaryManufacturerListTable({
  request,
  isLoading,
}: {
  request: any;
  isLoading: any;
}) {
  const columns: ColumnsType<RequestList> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%"
    },
    {
      title: "نام ماده اولیه یا محصول",
      dataIndex: "ProductOrMaterialName",
      key: "2",
    },
    // {
    //   title: "تاریخ درخواست",
    //   dataIndex: "CreateDate",
    //   key: "3",
    // },
    // {
    //   title: "نام شرکت",
    //   dataIndex: "CompanyName",
    //   key: "4",
    // },
    // {
    //   title: "روش تولید",
    //   dataIndex: "ProductionMethodName",
    //   key: "5",
    // },
    // {
    //   title: "وضعیت فرآیند",
    //   dataIndex: "IsReqDetailCompleted",
    //   key: "6",
    //   render: (e, record) => (
    //     <Switch defaultChecked={record.IsReqDetailCompleted} />
    //   ),
    // },

    // {
    //   title: "عملیات",
    //   key: "عملیات",
    //   align: "center",
    //   fixed: "right",
    //   width: "10%",
    //   render: () => (
    //     <Space size="middle">
    //       <Link href={""} className="action-btn-delete">
    //         حذف
    //       </Link>
    //       <Link href={""} className="text-secondary-500">
    //         مشاهده اطلاعات
    //       </Link>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div className="box-border w-full p-6 mt-8">
      <Typography className="text-right text-[16px] font-normal">
        جزئیات درخواست ها
      </Typography>
      <Table
        className="mt-8"
        loading={isLoading}
        columns={columns}
        dataSource={addIndexToData(request?.records)}
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
