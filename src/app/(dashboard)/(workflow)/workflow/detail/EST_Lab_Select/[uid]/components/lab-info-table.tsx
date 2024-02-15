import React, { useRef } from "react";
import CustomTable from "@/components/custom-table";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Button, Divider, Typography } from "antd";
import { PrinterIcon } from "@heroicons/react/24/solid";
import useBoxListPrint from "@/hooks/request-package/use-box-list-print";
import { RequestPackageApi } from "constance/request-package";
import { useReactToPrint } from "react-to-print";
import { z } from "zod";
import { ColumnType } from "antd/lib/table";
import useLabBoxListPrint from "@/hooks/request-package/use-lab-box-list-print";
import { Card, Descriptions } from "antd/lib";

const apiData = RequestPackageApi.LabBoxListPrint;

export default function LabInfoTable({ package_UID }: { package_UID: string }) {
  const labboxListPrint = useLabBoxListPrint({ package_UID });
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
      title: "نوع نمونه",
      dataIndex: "name",
      key: "2",
      width: "20%",
    },

    {
      title: "نام نمونه",
      dataIndex: "Sample_Type",
      key: "3",
    },
    {
      title: "روش تولید",
      dataIndex: "Production_Method",
      key: "7",
    },
    {
      title: "کد محرنامه قدیم",
      dataIndex: "Sample_Code_Asli_Ghadim",
      key: "5",
    },
    {
      title: "کد محرنامه جدید",
      dataIndex: "Sample_Code_Asli_Jadid",
      key: "5",
    },
    {
      title: "نام آزمایشگاه",
      dataIndex: "Lab_Name",
      key: "6",
    },
    {
      title: "آدرس آزمایشگاه",
      dataIndex: "Lab_Address",
      key: "7",
    },
  ];

  return (
    <>
      <div ref={componentRef}>
        <div className="print:hidden">
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
                  <PrinterIcon
                    className="print:hidden"
                    width={24}
                    height={24}
                  />
                  <span className="flex">چاپ</span>
                </Button>,
              ],
            }}
            // setInitialData={[]}
            isLoading={labboxListPrint.isLoading}
            data={{ records: labboxListPrint.data || ([] as any) }}
            columns={columns}
          />
        </div>
      </div>
      <div className="hidden">
        <Card
          ref={componentRef}
          title=""
          className="print:block w-full hover:shadow-lg transition duration-300 relative font-bold"
        >
          {labboxListPrint.data?.map((boxCard, index) => (
            <div key={index} className="print:block">
              <Card title={boxCard.Sample_Type}>
                <Descriptions>
                  <Descriptions.Item label="نوع نمونه">
                    {boxCard.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="نام نمونه">
                    {boxCard.Sample_Type}
                  </Descriptions.Item>
                  <Descriptions.Item label="روش تولید">
                    {boxCard.Production_Method}
                  </Descriptions.Item>
                </Descriptions>

                <Divider />

                <Descriptions title="اطلاعات آزمایشگاه">
                  <Descriptions.Item label="نام آزمایشگاه">
                    {boxCard.Lab_Name}
                  </Descriptions.Item>
                  <Descriptions.Item label="آدرس آزمایشگاه">
                    {boxCard.Lab_Address}
                  </Descriptions.Item>
                </Descriptions>

                <Divider />

                <Descriptions>
                  <Descriptions.Item label="کد محرمانه قدیم" className="w-full">
                    {boxCard.Sample_Code_Asli_Ghadim}
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions>
                  <Descriptions.Item label="کد محرمانه جدید" className="w-full">
                    {boxCard.Sample_Code_Asli_Jadid}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
