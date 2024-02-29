import React, { useState } from "react";
import { Card } from "@/components/card";
import CustomTable from "@/components/custom-table";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { ColumnsType } from "antd/es/table";
import { z } from "zod";
import { Button, Space, Tag, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import OptModal from "./opt-modal";
import { RequestPackageApi } from "constance/request-package";

const apiData = RequestPackageApi.LabBox2List;

interface TProps {
  package_UID: string;
  data: z.infer<typeof apiData.response> | any;
  isLoading: boolean;
}

export default function DataTable({ package_UID, data, isLoading }: TProps) {
  const [openOptModal, setOpenOptModal] = useState<string | undefined>();

  const columns: ColumnsType<z.infer<typeof apiData.Item>> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "جعبه",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "ظرفیت",
      dataIndex: "Capacity",
      key: "3",
    },
    {
      title: "وضعیت",
      dataIndex: "Is_Opened",
      key: "4",
      render: (_, record) => {
        let color = "";
        let name = "";
        let icon = <></>;
        if (record.Is_Opened === true) {
          color = "success";
          name = "باز شده";
          icon = <CheckCircleOutlined />;
        } else {
          color = "red";
          name = "باز نشده";
          icon = <CloseCircleOutlined />;
        }
        return (
          <Tag className="p-1" icon={icon} color={color}>
            {name}
          </Tag>
        );
      },
    },
    {
      title: "دریافت رمز جعبه",
      dataIndex: "Terse",
      key: "5",
      render: (_, record) => (
        <>
          {record.Is_Opened ? (
            <Typography className="text-gray-500 px-4 cursor-pointer">
              درب جعبه باز است
            </Typography>
          ) : (
            <Button
              className="text-secondary-500 font-bold"
              type="link"
              onClick={() => setOpenOptModal(record.UID)}
            >
              درخواست باز شدن باکس
            </Button>
          )}
        </>
      ),
    },
    {
      title: "عملیات",
      key: "عملیات",
      dataIndex: "Is_Recordbble",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="small">
          <Button
            className={
              !record.Is_Recordbble
                ? "text-gray-500 px-4 font-bold"
                : "text-secondary-500 font-bold"
            }
            disabled={!record.Is_Recordbble}
            type="link"
          >
            <Link
              href={`/workflow/detail/Lab_Test/${package_UID}/test/${package_UID}`}
            >
              ثبت نتیجه آزمون
            </Link>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card className="mt-8">
      <CustomTable
        header={{
          icon: <ViewColumnsIcon />,
          text: "لیست جعبه های درخواست",
        }}
        isLoading={isLoading}
        data={{ records: data }}
        columns={columns}
      />
      <OptModal
        package_UID={package_UID}
        openOptModal={openOptModal}
        setOpenOptModal={setOpenOptModal}
      />
    </Card>
  );
}
