"use client";

import { PlusIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Button, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import measureApi from "constance/measure";
import CustomTable from "@/components/custom-table";

import { z } from "zod";
import { Card } from "@/components/card";
import StatusColumn from "@/components/custom-table/StatusColumn";
import EditModal from "./measure-action-edit";
import useMeasureGet from "./hook/use-measure-get";

interface TProps {
  data: z.infer<typeof measureApi.BasicMeasureGetPage.Item>[] | undefined;
  isLoading: boolean;
  setModalVisible: (arg: boolean) => void;
  modalVisible: any;
}

export default function DataTable({
  setModalVisible,
  isLoading,
  data,
  modalVisible,
}: TProps) {
  const showModal = () => {
    setModalVisible(true);
  };

  const { setUid, getUid, steGetUid } = useMeasureGet();

  const columns: ColumnsType<
    z.infer<typeof measureApi.BasicMeasureGetPage.Item>
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
            onClick={() => setUid(record.uid)}
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
          setInitialData={() => {}}
          isLoading={isLoading}
          data={data}
          columns={columns}
        />
        <EditModal modalVisible={getUid} setModalVisible={steGetUid} />
      </Card>
    </>
  );
}
