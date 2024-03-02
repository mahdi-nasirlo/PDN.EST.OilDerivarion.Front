"use client";
import React from "react";
import CustomTable from "@/components/custom-table";
import { ColumnsType } from "antd/lib/table";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import useBaseInfoGetAllProducerProductCodes from "@/hooks/base-info/use-base-info-get-producer-product-codes";
import baseInfoApi from "constance/base-info";
import { z } from "zod";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd/lib";

const apiData = baseInfoApi.GetProducerProductCodes;

export default function DataTable() {
  const productCodes = useBaseInfoGetAllProducerProductCodes();

  const columns: ColumnsType<z.infer<typeof apiData.item>> = [
    {
      dataIndex: "Row",
      title: "ردیف",
    },
    {
      dataIndex: "Product_Name",
      title: "نام محصول",
    },
    {
      dataIndex: "Product_Code",
      title: "کد محصول",
    },
    {
      dataIndex: "Create_DT",
      title: "تاریخ ایجاد",
    },
    {
      dataIndex: "Is_Paid",
      title: "وضعیت",
      render(_, record) {
        let color = "";
        let name = "";
        let icon = <></>;
        if (record.Is_Paid === true) {
          color = "success";
          name = "پرداخت شده";
          icon = <CheckCircleOutlined />;
        } else record.Is_Paid === false;
        color = "red";
        name = "پرداخت نشده";
        icon = <CloseCircleOutlined />;

        return (
          <Tag className="p-1" icon={icon} color={color}>
            {name}
          </Tag>
        );
      },
    },
    {
      dataIndex: "Paid_DT",
      title: "تاریخ پرداخت",
    },
    {
      dataIndex: "Amount",
      title: "هزینه پرداخت",
    },
  ];

  return (
    <CustomTable
      header={{
        text: "لیست محصولات",
        icon: <ViewColumnsIcon />,
      }}
      loading={productCodes.isLoading}
      data={{ records: productCodes?.data }}
      columns={columns}
    />
  );
}
