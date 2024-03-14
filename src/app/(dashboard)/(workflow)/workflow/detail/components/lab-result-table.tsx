import { Card } from "@/components/card";
import useLabReport from "@/hooks/request-package/use-lab-report";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Spin } from "antd";
import { Descriptions } from "antd/lib";
import { ColumnsType } from "antd/lib/table";
import { RequestPackageApi } from "constance/request-package";
import React from "react";
import CustomTable from "@/components/custom-table";

import { z } from "zod";
const apiData = RequestPackageApi.LabReport;

export default function LabResultTable({
  package_UID,
}: {
  package_UID: string;
}) {
  const { data, isFetching } = useLabReport({ package_UID: package_UID });
  const columns: ColumnsType<z.infer<typeof apiData.Item>> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "نام نمونه",
      dataIndex: "Sample_Name",
      key: "2",
    },
    {
      title: "نوع نمونه",
      dataIndex: "Sample_Type_Value",
      key: "3",
    },
    {
      title: "عنوان فاکتور آزمون",
      dataIndex: "Name",
      key: "3",
    },
    {
      title: "استاندارد آزمون",
      dataIndex: "Title",
      key: "4",
    },
    {
      title: "نتیجه آزمایش",
      dataIndex: "Result_Test",
      key: "5",
    },
    {
      title: "محدوده آزمایش",
      dataIndex: "Result_Range",
      key: "3",
    },
    {
      title: "حداقل بازه قابل قبول",
      dataIndex: "Result_Min_Accept",
      key: "5",
    },
    {
      title: "حداکثر بازه قابل قبول",
      dataIndex: "Result_Max_Accept",
      key: "5",
    },
    {
      title: "واحد تجدید پذیری",
      dataIndex: "Result_Renew_Unit_FK",
      key: "5",
    },
    {
      title: "تجدید پذیر",
      dataIndex: "Result_Renewable",
      key: "5",
    },
    {
      title: "توضیحات",
      dataIndex: "Result_Desc",
      key: "4",
    },
    {
      title: "نام تامین کننده",
      dataIndex: "Material_Supply_Name",
      key: "5",
    },
    {
      title: "کد ملی تامین کننده",
      dataIndex: "Material_Supply_National_Code",
      key: "5",
    },
    {
      title: "ایرانکد",
      dataIndex: "Material_Supply_Iran_Code",
      key: "5",
    },
    {
      title: "شماره اظهار نامه",
      dataIndex: "Material_Import_Declaration_Number",
      key: "5",
    },
    {
      title: "میزان مصرف کل برای یک واحد تولیدی(کیلوگرم)",
      dataIndex: "Material_Unit_Consumption",
      key: "5",
    },
    {
      title: "در صد استفاده ماده اولیه",
      dataIndex: "Material_Usage_Percentage",
      key: "5",
    },
    {
      title: "آدرس تامین کننده",
      dataIndex: "Material_Supply_Address",
      key: "5",
    },
    {
      title: "تعداد فاکتور آزمون",
      dataIndex: "Test_Item_Count",
      key: "5",
    },
  ];

  return (
    <>
      <CustomTable
        header={{
          icon: <ViewColumnsIcon />,
          text: "لیست نتایج آزمون",
        }}
        isLoading={isFetching}
        pagination={false}
        data={{ records: data }}
        columns={columns}
      />
    </>
  );
}
