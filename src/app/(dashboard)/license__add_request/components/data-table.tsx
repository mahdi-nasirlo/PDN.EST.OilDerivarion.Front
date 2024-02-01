"use client";

import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Measure } from "../../../../../interfaces/measures";
import StatusColumn from "@/components/custom-table/StatusColumn";
import CustomeTable from "../../../../components/custom-table";
import useProducerInfo from "./hook/use-producer-info";
import { string, z } from "zod";
import licenseApi from "constance/license";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { materialApi } from "constance/material";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";

export default function DataTable() {
  const { list, del, handleDelete, setDelUid, delUid } = useProducerInfo();

  const renderStatus = (
    _: any,
    record: z.infer<typeof licenseApi.GetRequestList.Item>
  ) => {
    let color = "";
    let name = "";
    let icon = <></>;

    console.log(record);

    if (record.Wrork_State !== 0) {
      if (record.Wrork_State === 1) {
        color = "orange";
        name = "درحال بررسی";
        icon = <CloseCircleOutlined />;
      } else if (record.Wrork_State === 2) {
        color = "orange";
        name = "رد شده";
        icon = <CheckCircleOutlined />;
      } else if (record.Wrork_State === 3) {
        color = "success";
        name = "فعال";
        icon = <CheckCircleOutlined />;
      }

      return (
        <Tag icon={icon} color={color}>
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

  const columns: ColumnsType<z.infer<typeof licenseApi.GetRequestList.Item>> = [
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
      title: "کدملی",
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
    // {
    //   title: "توضیحات بررسی کننده",
    //   dataIndex: "name",
    //   key: "2",
    // },
    // {
    //   title: "تاریخ بررسی ",
    //   dataIndex: "name",
    //   key: "2",
    // },
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
  ];

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <CustomeTable
          header={{
            icon: <ViewColumnsIcon />,
            text: "لیست مجوزها",
          }}
          setInitialData={() => {}}
          isLoading={list.isLoading}
          data={list.data}
          columns={columns}
        />
        <ConfirmDeleteModal
          loading={del.isPending}
          open={typeof delUid === "string"}
          setOpen={setDelUid}
          handleDelete={handleDelete}
          title="درخواست"
        />
      </div>
    </>
  );
}
