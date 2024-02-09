"use client";

import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Card } from "@/components/card";
import { z } from "zod";
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { boxGPSApi } from "constance/box-gps";
import StatusColumn from "@/components/custom-table/StatusColumn";
import EditModal from "./edit-modal";

import Link from "next/link";
import DeleteModal from "./delete-modal";

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
      title: "ظرفیت",
      dataIndex: "capacity",
      key: "2",
    },
    {
      title: "نام استان",
      dataIndex: "stateName",
      key: "2",
    },
    {
      title: "فعال/غیر فعال ",
      dataIndex: "is_Active",
      key: "3",
      render: (e, record) => <StatusColumn record={record} />,
    },
    {
      title: "مکان یابی",
      dataIndex: "confirmedRequest",
      key: "4",
      render: (_, record) => (
        <Space size="small">
          <Button type="link" className="text-primary-500 font-bold">
            <Link href={"/gps_device/location"}>
              مشاهده موقعیت
            </Link>
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
          {/* <Button
            type="link"
            className="text-primary-500 font-bold"
            // loading={openBox.isMutating}
            onClick={() => openBox.trigger()}
          >
            بازکردن درب دستگاه
          </Button> */}
          <Button
            type="link"
            className="text-secondary-500 font-bold"
            onClick={() => setGetUid(record.uid)}
          >
            ویرایش
          </Button>
          <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => setUidDelete(record.uid)}

          >
            حذف
          </Button>
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
                className="max-md:w-full flex justify- items-center gap-2"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => setModalVisible(true)}
              >
                <PlusIcon width={24} height={24} />
                <span className="flex">افزودن  باکس</span>
              </Button>,
            ],
          }}
          setInitialData={setPaginate}
          isLoading={isLoading}
          data={{ records: data }}
          columns={columns}
        />
        <EditModal
          editModalUid={uid}
          setEditModalUid={setGetUid}
        />
        <DeleteModal
          uidDelete={uidDelete}
          setUidDelete={setUidDelete}
        />
      </Card>
    </>
  );
}
