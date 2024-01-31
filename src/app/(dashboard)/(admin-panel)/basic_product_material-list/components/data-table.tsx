"use client";

import { Button, Space, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { Card } from "@/components/card";
import { z } from "zod";
import basicApi from "constance/basic";
import StateAction from "@/app/(dashboard)/(admin-panel)/role_determination/components/state-action";
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { materialApi } from "constance/material";
import StatusColumn from "@/components/custom-table/StatusColumn";
import useBasicMaterial from "./hook/use-basic-material";

export default function DataTable({
  setModalVisible,
}: {
  setModalVisible: any;
}) {
  const { list } = useBasicMaterial();
  const columns: ColumnsType<
    z.infer<typeof materialApi.BasicProductMaterialList.Item>
  > = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "ماده اولیه",
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
      title: "نقش",
      dataIndex: "TestItems",
      key: "4",
      render: (_, record) => {
        if (record.TestItems === null) {
          return <Typography>_</Typography>;
        }
        return (
          <Tooltip
            placement="top"
            title={<Typography>{record.TestItems}</Typography>}
          >
            <Typography.Text
              className="max-w-[180px]"
              ellipsis={true}
              style={{ width: "40px !important" }}
            >
              {record.TestItems}
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
          <button className="text-secondary-500 font-bold py-2 px-2">
            تعیین نقش
          </button>
          <button className="text-secondary-500 font-bold  py-2 px-2">
            تعیین استان
          </button>
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
            text: "لیست مواد اولیه محصول",
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
          setInitialData={() => {}}
          isLoading={list.isLoading}
          data={list.data}
          columns={columns}
        />
      </Card>
    </>
  );
}
