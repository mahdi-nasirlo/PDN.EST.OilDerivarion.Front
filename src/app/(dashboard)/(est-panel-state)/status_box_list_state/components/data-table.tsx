"use client";

import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Card } from "@/components/card";
import { z } from "zod";
import CustomTable from "@/components/custom-table";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { boxGPSApi } from "constance/box-gps";
import Link from "next/link";
import StatusColumnBox from "@/components/custom-table/StatusColumnBox";
import StatusBoxAction from "./status-box-action";
import useBoxOpen from "@/hooks/box-gps/use-box-open";

const apiData = boxGPSApi.BoxGPSGetPage;

interface TProps {
  data: z.infer<typeof apiData.response.shape.data> | undefined;
  isLoading: boolean;
  setPaginate: (arg: any) => void;
}

export default function DataTable({ data, isLoading, setPaginate }: TProps) {
  const openBox = useBoxOpen();

  const [uidStatus, setUidStatus] = useState<string>();

  const columns: ColumnsType<z.infer<typeof apiData.item>> = [
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
    },
    {
      title: "کد جعبه",
      dataIndex: "code",
      key: "3",
    },
    {
      title: "وضعیت",
      dataIndex: "device_Status",
      key: "4",
      render: (e, record) => <StatusColumnBox record={record} />,
    },
    {
      title: "تاریخچه سفر ها",
      dataIndex: "confirmedRequest",
      key: "5",
      render: (_, record) => (
        <Space size="small">
          <Button type="link" className="text-primary-500 font-bold">
            <Link href={"/status_box_list_state/travel_history"}>مشاهده</Link>
          </Button>
        </Space>
      ),
    },
    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="small">
          {record.device_Status !== 2 && (
            <>
              <Button
                type="link"
                className="text-primary-500 font-bold"
              // loading={openBox.isPending}
              // onClick={() => openBox.mutateAsync()}
              >
                بازکردن درب دستگاه
              </Button>
              <Button
                type="link"
                className="text-secondary-500 font-bold"
                onClick={() => setUidStatus(record.uid)}
              >
                تغییر وضعیت
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card className="mt-8">
        <CustomTable
          header={{
            icon: <ViewColumnsIcon />,
            text: "مدیریت وضعیت جعبه ها",
          }}
          setInitialData={setPaginate}
          isLoading={isLoading}
          data={data}
          columns={columns}
        />
        <StatusBoxAction open={uidStatus} setOpen={setUidStatus} />
      </Card>
    </>
  );
}
