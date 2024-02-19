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
import { Card, Descriptions, Divider } from "antd/lib";

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
    },

    {
      title: "مواد اولیه/محصولات",
      dataIndex: "Sample_Type",
      key: "3",
    },
    {
      title: "نوع جعبه",
      dataIndex: "Box_Type",
      key: "4",
    },
    {
      title: "ظرفیت جعبه",
      dataIndex: "Box_Data",
      key: "5",
    },
    {
      title: "بارکد بطری",
      dataIndex: "Sample_Code",
      key: "6",
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
            isLoading={boxListPrint.isLoading}
            data={{ records: boxListPrint.data || ([] as any) }}
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
          {boxListPrint?.data?.map((boxCard, index) => (
            <div key={index} className="print:block">
              <Card title={boxCard.Sample_Type}>
                <Descriptions>
                  <Descriptions.Item label="نوع نمونه">
                    {boxCard.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="نام نمونه">
                    {boxCard.Sample_Type}
                  </Descriptions.Item>
                </Descriptions>

                <Divider />

                <Descriptions title="اطلاعات جعبه">
                  <Descriptions.Item label="نوع جعبه" className="w-full">
                    {boxCard.Box_Type}
                  </Descriptions.Item>
                  <Descriptions.Item label="ظرفیت جعبه" className="w-full">
                    {boxCard.Box_Data}
                  </Descriptions.Item>
                  <br />
                  <Descriptions.Item label="بارکد بطری">
                    {boxCard.Sample_Code}
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
