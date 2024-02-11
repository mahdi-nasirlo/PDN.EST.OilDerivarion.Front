"use client";

import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import CustomTable from "../../../../components/custom-table";
import { z } from "zod";
import React from "react";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useProducerInfo from "../hook/use-producer-info";
import licenseApi from "constance/license";

const apiData = licenseApi.GetRequestListForCurrentUser;

export default function DataTable() {
  const { list, del, handleDelete, setDelUid, delUid } = useProducerInfo();

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
        <Tag className='p-1' icon={icon} color={color}>
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
  ];

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <CustomTable
          header={{
            icon: <ViewColumnsIcon />,
            text: "لیست مجوزها",
          }}
          setInitialData={() => { }}
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
      </div>
    </>
  );
}
