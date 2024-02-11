import React, { useState } from "react";
import CustomTable from "@/components/custom-table";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { PrinterIcon } from "@heroicons/react/24/solid";

export default function LastCheckTable() {
  const columns: any = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "مواد اولیه و محصولات",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "جعبه",
      dataIndex: "productCategoryName",
      key: "3",
    },
    {
      title: "نوع جعبه",
      dataIndex: "productCategoryName",
      key: "3",
    },
  ];

  return (
    <>
      <CustomTable
        header={{
          icon: <ViewColumnsIcon />,
          text: "بررسی نهایی",
          actions: [
            <Button
              key={"1"}
              className="max-md:w-full flex justify- items-center gap-2"
              size="large"
              type="primary"
              htmlType="submit"
              // onClick={() => {
              //   setModalVisible(true);
              // }}
            >
              <PrinterIcon width={24} height={24} />
              <span className="flex">چاپ</span>
            </Button>,
          ],
        }}
        // setInitialData={setPaginate}
        // isLoading={{}}
        data={{ records: [] }}
        columns={columns}
      />
    </>
  );
}
