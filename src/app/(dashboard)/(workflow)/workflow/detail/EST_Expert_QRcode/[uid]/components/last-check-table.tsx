import React, { useRef } from "react";
import CustomTable from "@/components/custom-table";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Button, Typography } from "antd";
import { PrinterIcon } from "@heroicons/react/24/solid";
import useBoxListPrint from "@/hooks/request-package/use-box-list-print";
import { RequestPackageApi } from "constance/request-package";
import { useReactToPrint } from "react-to-print";
import { any, z } from "zod";
import { ColumnType } from "antd/lib/table";

const apiData = RequestPackageApi.BoxListPrint;

export default function LastCheckTable({
  package_UID,
}: {
  package_UID: string;
}) {
  const boxListPrint = useBoxListPrint({ package_UID });
  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns: ColumnType<z.infer<typeof apiData.Item>>[] = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },

    {
      title: "نام",
      dataIndex: "name",
      key: "2",
      width: "20%",
      render: (_, records) => {
        return (
          <>
            {records.Production_Method}
            <br />
            {records.Box_Type}
            <br />
            {records.Sample_Type}
            <br />
            {_}
            <br />
          </>
        );
        // return `${records.Sample_Type} __ ${_} __ ${records.Box_Type}`;
      },
    },

    // {
    //   title: "مواد اولیه/محصولات",
    //   dataIndex: "Sample_Type",
    //   key: "3",
    // },
    // {
    //   title: "نوع جعبه",
    //   dataIndex: "Box_Type",
    //   key: "4",
    // },
    {
      title: "ظرفیت جعبه",
      dataIndex: "Box_Data",
      key: "5",
      render(value: string, record, index) {
        return value;
      },
    },
    {
      title: "بارکد بطری",
      dataIndex: "Sample_Code",
      key: "6",
      render: () => "423443-23423k234-klj23l4j23-lkj23k4j23lk4jjkl",
    },
    // {
    //   title: "روش تولید",
    //   dataIndex: "Production_Method",
    //   key: "7",
    // },
  ];

  return (
    <>
      <div ref={componentRef}>
        <CustomTable
          ref={componentRef}
          header={{
            icon: <ViewColumnsIcon className="print:hidden" />,
            text: "بررسی نهایی",
            actions: [
              <Button
                key={"1"}
                className="max-md:w-full flex justify- items-center gap-2 print:hidden"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={handlePrint}
              >
                <PrinterIcon className="print:hidden" width={24} height={24} />
                <span className="flex">چاپ</span>
              </Button>,
            ],
          }}
          // setInitialData={[]}
          isLoading={boxListPrint.isLoading}
          data={{ records: boxListPrint.data || ([] as any) }}
          columns={columns}
        />
      </div>
    </>
  );
}
