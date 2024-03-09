import React from "react";
import CustomTable from "@/components/custom-table";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { RequestPackageApi } from "constance/request-package";
import { z } from "zod";
import { ColumnType } from "antd/lib/table";
import useBoxList from "@/hooks/request-package/use-box-list";
import useBoxDeviceListForOpen from "@/hooks/request-package/use-box-device-list-for-open";
import StatusColumnBox from "@/components/custom-table/StatusColumnBox";
import StatusColumnBoxVisit from "@/components/custom-table/StatusColumnBoxVisit";
import useBoxOpen from "@/hooks/box-gps/use-box-open";
import { Button, Space, Tag } from "antd/lib";
import useBoxDeviceOpen from "@/hooks/request-package/use-box-device-open";

const apiData = RequestPackageApi.LabBoxListPrint;
const data = RequestPackageApi.BoxDeviceListForOpen;

export default function VisitBoxList({ package_UID }: { package_UID: string }) {
  const boxList = useBoxDeviceListForOpen({ package_UID });
  const openBox = useBoxOpen();
  const boxOpen = useBoxDeviceOpen();

  const handleOpen = (record: z.infer<typeof data.Item>) => {
    boxOpen.mutateAsync({ box_UID: record.box_UID, package_UID });
  };

  const columns: ColumnType<z.infer<typeof data.Item>>[] = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "اطلاعات جعبه",
      dataIndex: "box_info",
      key: "2",
    },
    {
      title: "IMEI",
      dataIndex: "IMEI",
      key: "3",
    },
    {
      title: "وضعیت جعبه",
      dataIndex: "Device_Status",
      key: "4",
      render: (e, record) => <StatusColumnBoxVisit record={record} />,
    },
    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="small">
          {record.Device_Status == 2 ? (
            <>
              <Button
                type="link"
                className="text-primary-500 font-bold"
                // disabled={record.device_Status != 6}
                loading={boxOpen.isPending}
                onClick={() => handleOpen(record)}
              >
                بازکردن درب دستگاه
              </Button>
            </>
          ) : record.Device_Status == 1 ? (
            <>
              <Tag color="blue-inverse">درب جعبه باز است</Tag>
            </>
          ) : (
            <>
              <Tag color="orange-inverse">نامشخص</Tag>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="print:hidden">
        <CustomTable
          header={{
            icon: <ViewColumnsIcon className="print:hidden" />,
            text: "بازکردن درب جعبه های بازدید",
          }}
          isLoading={boxList.isLoading}
          data={{ records: boxList.data || ([] as any) }}
          columns={columns}
        />
      </div>
    </>
  );
}
