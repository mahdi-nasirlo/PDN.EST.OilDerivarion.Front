"use client";

import { PlusIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import measureApi from "constance/measure";
import CustomTable from "@/components/custom-table";
import { z } from "zod";
import { Card } from "@/components/card";
import StatusColumn from "@/components/custom-table/StatusColumn";
import EditModal from "./measure-action-edit";


const apiData = measureApi.BasicMeasureGetPage

interface TProps {
  data: z.infer<typeof apiData.response.shape.data> | undefined;
  isLoading: boolean;
  setModalVisible: (arg: boolean) => void;
  setPaginate: (arg: any) => void
}

export default function DataTable({
  setModalVisible,
  isLoading,
  data,
  setPaginate,
}: TProps) {

  const [uid, setGetUid] = useState<string | boolean>();

  const columns: ColumnsType<
    z.infer<typeof apiData.Item>
  > = [
      {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
        width: "5%",
      },
      {
        title: "واحد اندازه گیری",
        dataIndex: "name",
        key: "2",
      },
      {
        title: "فعال/غیر فعال",
        dataIndex: "isActive",
        key: "4",
        render: (_, record: any) => <StatusColumn record={record} />,
      },
      {
        title: "عملیات",
        key: "عملیات",
        align: "center",
        fixed: "right",
        width: "10%",
        render: (_, record) => (
          <Space size="small">
            <Button
              type="link"
              className={"text-secondary-500 font-bold"}
              onClick={() => setGetUid(record.uid)}
            >
              ویرایش
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
            text: "لیست واحد اندازه گیری",
            actions: [
              <Button
                key={"1"}
                className="max-md:w-full flex justify- items-center gap-2"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setModalVisible(true);
                }}
              >
                <PlusIcon width={24} height={24} />
                <span className="flex">افزودن واحد اندازه گیری</span>
              </Button>,
            ],
          }}
          setInitialData={setPaginate}
          isLoading={isLoading}
          data={data}
          columns={columns}
        />
        <EditModal
          editModalUid={uid}
          setEditModalUid={setGetUid}
        />
      </Card>
    </>
  );
}
