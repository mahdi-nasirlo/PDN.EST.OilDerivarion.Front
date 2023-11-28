import { Typography } from "antd";
import React from "react";
import { ColumnsType } from "antd/es/table";
import { RequestList } from "../../../../../../../interfaces/requestDetail";
import CustomeTable from '../../../../../../../components/CustomeTable';

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
      <CustomeTable
        setInitialData={() => { }}
        isLoading={isLoading}
        data={request}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
