"use client";

import { Button, Space, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Card } from "@/components/card";
import { z } from "zod";
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { materialApi } from "constance/material";
import StatusColumn from "@/components/custom-table/StatusColumn";
import EditModal from "./edit-modal";

const apiData = materialApi.BasicProductMaterialGetPage;

interface TProps {
  data: z.infer<typeof apiData.response.shape.data> | undefined;
  isLoading: boolean;
  setModalVisible: (arg: boolean) => void;
  setPaginate: (arg: any) => void
}

export default function DataTable({ data, isLoading, setModalVisible, setPaginate }: TProps) {

  const [uid, setGetUid] = useState<string | boolean>();

  const columns: ColumnsType<
    z.infer<typeof apiData.item>
  > = [
      {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
        width: "5%",
      },
      {
        title: "نام ماده اولیه",
        dataIndex: "name",
        key: "2",
      },
      {
        title: "واحد اندازه کیری",
        dataIndex: "measureName",
        key: "2",
      },
      {
        title: "فعال/غیرفعال",
        dataIndex: "isActive",
        key: "5",
        render: (_, record: any) => <StatusColumn record={record} />,
      },
      {
        title: "فاکتورهای آزمون",
        dataIndex: "testItems",
        key: "4",
        render: (_, record) => {
          if (record.testItems === null) {
            return <Typography>_</Typography>;
          }
          return (
            <Tooltip
              placement="top"
              title={<Typography>{record.testItems}</Typography>}
            >
              <Typography.Text
                className="max-w-[180px]"
                ellipsis={true}
                style={{ width: "40px !important" }}
              >
                {record.testItems}
              </Typography.Text>
            </Tooltip>
          );
        },
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
              className="text-secondary-500 font-bold"
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
            text: "لیست مواد اولیه",
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
                <span className="flex">افزودن ماده اولیه</span>
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
