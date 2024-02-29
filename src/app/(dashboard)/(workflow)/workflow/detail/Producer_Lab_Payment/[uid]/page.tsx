"use client"

import React from "react";
import CommonWorkflow from "@/app/(dashboard)/(workflow)/workflow/detail/[key]/[uid]/component/common-workflow";
import usePaymentList from "@/hooks/request-package/use-payment-list";
import { ColumnsType } from "antd/es/table";
import { z } from "zod";
import { RequestPackageApi } from "constance/request-package";
import { Divider, Tag, Tooltip, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import CustomTable from "@/components/custom-table"


const Page = ({ params: { uid } }: { params: { uid: string } }) => {


  const PaymentList = usePaymentList({ package_UID: uid })

  const columns: ColumnsType<z.infer<typeof RequestPackageApi.PaymentList.item>> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "عنوان پرداخت",
      dataIndex: "Payment_Type",
      key: "2",
      render: (_, record) => {
        let name = "";
        if (record.Payment_Type === 1) {
          name = "در انتظار پرداخت هزینه بازدید";
        } else if (record.Payment_Type === 2) {
          name = "در انتظار پرداخت هزینه پست";
        } else if (record.Payment_Type === 3) {
          name = "در انتظار پرداخت هزینه آزمایش"
        } else if (record.Payment_Type === 4) {
          name = "در انتظار پرداخت هزینه صدور کد رهگیری"
        } else {
          name = "هزینه نامعلوم"
        }
        return (
          <Typography>
            {name}
          </Typography>
        );
      },
    },
    {
      title: "زمان ایجاد فاکتور",
      dataIndex: "Create_DT",
      align: "center",
      key: "5",
      render: (_, record) => {
        if (record.Create_DT == null) {
          return <Typography>_</Typography>
        }
        return <Typography>{record.Create_DT}</Typography>
      }
    },
    {
      title: "ملبغ",
      dataIndex: "Amount",
      key: "4",
      width: "5%",
      render: (_, record) => (
        <Typography>
          {record.Amount} ریال
        </Typography>
      )
    },
    {
      title: "توضیحات",
      dataIndex: "Description",
      key: "5",
      width: "50%",
      render: (_, record) => (
        <Tooltip
          placement="top"
          title={<Typography>{record.Description}</Typography>}
        >
          <Typography.Text
            className="w-full"
            ellipsis={true}
          >
            {record.Description}
          </Typography.Text>
        </Tooltip>
      )
    },
    {
      title: "وضعیت",
      dataIndex: "Is_Paid",
      key: "3",
      render: (_, record) => {
        let color = "";
        let name = "";
        let icon = <></>;
        if (record.Is_Paid === true) {
          name = "پرداخت شده"
          color = 'success'
          icon = <CheckCircleOutlined />
        } else {
          name = "پرداخت نشده";
          icon = <CloseCircleOutlined />
          color = 'red'
        }
        return (
          <Tag className='p-1' icon={icon} color={color} >
            {name}
          </Tag >
        )
      }
    },
    {
      title: "تاریخ پرداخت",
      dataIndex: "Paid_DT",
      align: "center",
      key: "5",
      render: (_, record) => {
        if (record.Paid_DT == null) {
          return <Typography>_</Typography>
        }
        return <Typography>{record.Paid_DT}</Typography>
      }
    },
  ];

  return (
    <CommonWorkflow uid={uid} stepKey={"Producer_Lab_Payment"}>
      <Divider />
      <CustomTable
        loading={PaymentList.isLoading || PaymentList.isFetching}
        data={{ records: PaymentList.data }}
        columns={columns}
        header={{
          icon: <ViewColumnsIcon />,
          text: "لیست پرداخت های متقاضی",
        }}
      />
    </CommonWorkflow>
  );
};

export default Page;
