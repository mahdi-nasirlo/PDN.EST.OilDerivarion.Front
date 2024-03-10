"use client";

import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import CustomTable from "../../../../components/custom-table";
import { z } from "zod";
import React, { useState } from "react";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useProducerInfo from "../hook/use-producer-info";
import licenseApi from "constance/license";
import GpsLabModal from "../../(admin-panel)/lab_list/components/gps-lab-modal";
import GpsProducerModal from "./gps-lab-modal";
import SetLocation from "./set-producer-location";

const apiData = licenseApi.GetRequestListForCurrentUser;

export default function DataTable() {
  const { list, del, handleDelete, setDelUid, delUid } = useProducerInfo();
  const [isGPSModalVisible, setIsGPSModalVisible] = useState(false);
  const [isGPSModalVisibleset, setIsGPSModalVisibleset] = useState(false);
  const [selectedLabUid, setSelectedLabUid] = useState<string | null>(null);

  const handleGPS = (record: z.infer<typeof apiData.Item>) => {
    setSelectedLabUid(record.Uid);
    setIsGPSModalVisible(true);
  };
  const handleSetlocation = (record: z.infer<typeof apiData.Item>) => {
    setSelectedLabUid(record.Uid);
    setIsGPSModalVisibleset(true);
  };

  const renderStatus = (_: any, record: z.infer<typeof apiData.Item>) => {
    let color = "";
    let name = "";
    let icon = <></>;

    if (record.Wrork_State !== 0) {
      if (record.Wrork_State === 1) {
        color = "orange";
        name = "درحال بررسی";
        icon = <CloseCircleOutlined />;
      } else if (record.Wrork_State === 2) {
        color = "red";
        name = "رد";
        icon = <CheckCircleOutlined />;
      } else if (record.Wrork_State === 3) {
        color = "success";
        name = "تایید";
        icon = <CheckCircleOutlined />;
      }

      return (
        <Tag className="p-1" icon={icon} color={color}>
          {name}
        </Tag>
      );
    }

    return (
      <Space size="small">
        {
          <Button
            type="link"
            className={"text-red-500 font-bold"}
            onClick={() => {
              setDelUid(record.Uid);
            }}
          >
            حذف
          </Button>
        }
      </Space>
    );
  };

  const columns: ColumnsType<z.infer<typeof apiData.Item>> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "نام",
      dataIndex: "Representative__Name",
      key: "2",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "Representative__Family",
      key: "2",
    },
    {
      title: "شماره ملی",
      dataIndex: "Representative__National_Code",
      key: "2",
    },
    {
      title: "نام شرکت",
      dataIndex: "Company__Name",
      key: "2",
    },
    {
      title: "شناسه ملی شرکت",
      dataIndex: "Company__National_ID",
      key: "2",
    },
    {
      title: "شناسه کسب وکار",
      dataIndex: "Company__Business_ID",
      key: "2",
    },
    {
      title: "نوع مجوز",
      dataIndex: "License_Type",
      key: "2",
    },
    {
      title: "شماره مجوز",
      dataIndex: "License_Number",
      key: "2",
    },
    {
      title: "تاریخ اعتبار",
      dataIndex: "License_Expire_Date_Fa",
      key: "2",
    },
    {
      title: "استان",
      dataIndex: "State_Name",
      key: "2",
    },
    {
      title: "موقعیت جغرافیایی",
      dataIndex: "test",
      key: "7",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            className="text-primary-500 font-bold"
            onClick={() => handleGPS(record)}
          >
            مشاهده موقعیت
          </Button>
        </Space>
      ),
    },
    {
      title: "توضیحات بررسی کننده",
      dataIndex: "Response_Message",
      key: "2",
    },
    {
      title: "تاریخ بررسی ",
      dataIndex: "Response_DateTime",
      key: "2",
    },
    {
      title: "وضعیت",
      dataIndex: "Wrork_State",
      key: "4",
      render: renderStatus,
    },
    // {
    //   title: "عملیات",
    //   key: "عملیات",
    //   align: "center",
    //   fixed: "right",
    //   width: "10%",
    //   render: (_, record) => (

    //   ),
    // },
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
            onClick={() => handleSetlocation(record)}
          >
            تعیین موقعیت واحد تولیدی
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <CustomTable
          header={{
            icon: <ViewColumnsIcon />,
            text: "لیست مجوزها",
          }}
          isLoading={list.isFetching}
          pagination={false}
          data={{ records: list.data }}
          columns={columns}
        />
        <ConfirmDeleteModal
          loading={del.isPending}
          open={typeof delUid === "string"}
          setOpen={setDelUid}
          handleDelete={handleDelete}
          title="درخواست"
        />
        <SetLocation
          selectedLabUid={selectedLabUid}
          setSelectedLabUid={setSelectedLabUid}
          isGPSModalVisibleset={isGPSModalVisibleset}
          setIsGPSModalVisibleset={setIsGPSModalVisibleset}
        />
        <GpsProducerModal
          selectedLabUid={selectedLabUid}
          setSelectedLabUid={setSelectedLabUid}
          isGPSModalVisible={isGPSModalVisible}
          setIsGPSModalVisible={setIsGPSModalVisible}
        />
      </div>
    </>
  );
}
