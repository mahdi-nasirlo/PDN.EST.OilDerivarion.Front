"use client";

import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Card } from "@/components/card";
import { record, z } from "zod";
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { boxGPSApi } from "constance/box-gps";
import StatusColumnBox from "@/components/custom-table/StatusColumnBox";
import EditModal from "./edit-modal";
import Link from "next/link";
import DeleteModal from "./delete-modal";
import useBoxOpen from "@/hooks/box-gps/use-box-open";
import useBasicOpenBasic from "@/hooks/box-gps/use-basic-open-box";

const apiData = boxGPSApi.BoxGPSGetPage;

interface TProps {
  data: z.infer<typeof apiData.response.shape.data> | undefined;
  isLoading: boolean;
  setModalVisible: (arg: boolean) => void;
  setPaginate: (arg: any) => void;
}

export default function DataTable({
  data,
  isLoading,
  setModalVisible,
  setPaginate,
}: TProps) {
  const [uid, setGetUid] = useState<string | boolean>();

  const [uidDelete, setUidDelete] = useState<string | boolean>();
  const [open, setOpen] = useState("");
  const openBox = useBoxOpen();
  const boxOpen = useBasicOpenBasic();
  const handleOpen = (record: z.infer<typeof apiData.item>) => {
    boxOpen.mutateAsync({ imei: record.iMEI });
  };

  const columns: ColumnsType<z.infer<typeof apiData.item>> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "کد جعبه",
      dataIndex: "code",
      key: "2",
    },
    {
      title: "نام",
      dataIndex: "name",
      key: "3",
    },
    {
      title: "imei ",
      dataIndex: "iMEI",
      key: "3",
    },
    {
      title: "ظرفیت",
      dataIndex: "capacity",
      key: "4",
    },
    {
      title: "نام استان",
      dataIndex: "stateName",
      key: "5",
    },
    {
      title: "وضعیت",
      dataIndex: "device_Status",
      key: "6",
      render: (e, record) => <StatusColumnBox record={record} />,
    },
    {
      title: "تاریخچه سفرها",
      dataIndex: "confirmedRequest",
      key: "7",
      render: (_, record) => (
        <Space size="small">
          <Button type="link" className="text-primary-500 font-bold">
            <Link href={"/gps_device/travel_history"}>مشاهده</Link>
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
          {record.device_Status !== 6 && (
            <>
              <Button
                type="link"
                className="text-secondary-500 font-bold"
                onClick={() => setGetUid(record.uid)}
              >
                ویرایش
              </Button>
            </>
          )}

          {record.device_Status !== 6 && (
            <Button
              type="link"
              className="text-red-500 font-bold"
              onClick={() => setUidDelete(record.uid)}
            >
              حذف
            </Button>
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
            text: "لیست جعبه ها",
            actions: [
              <Button
                key={"1"}
                className="flex justify- items-center gap-2"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => setModalVisible(true)}
              >
                <PlusIcon width={24} height={24} />
                <span className="flex">افزودن جعبه</span>
              </Button>,
            ],
          }}
          setInitialData={setPaginate}
          isLoading={isLoading}
          data={data}
          columns={columns}
        />
        <EditModal editModalUid={uid} setEditModalUid={setGetUid} />
        <DeleteModal uidDelete={uidDelete} setUidDelete={setUidDelete} />
      </Card>
    </>
  );
}
