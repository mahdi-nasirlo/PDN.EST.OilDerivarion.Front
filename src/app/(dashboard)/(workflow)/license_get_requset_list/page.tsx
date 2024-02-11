"use client";

import React from "react";
import { Card } from "@/components/card";
import { ColumnsType } from "antd/es/table";
import { Space, Tag } from "antd/lib";
import Breadcrumb from "@/components/breadcrumb";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import licenseApi from "constance/license";
import VisitInfo from "@/components/workflow/visit-info";
import useGetRequestList from "@/hooks/license/use-get-request-list";
import WorkflowTable from "@/components/workflow/workflow-table";
import { CheckCircleOutlined } from "@ant-design/icons";
import { z } from "zod";

const apiData = licenseApi.GetRequestList.Item;

const Page = () => {
  const list = useGetRequestList();

  const extraColumns: ColumnsType<z.infer<typeof apiData>> = [
    {
      title: "وضعیت",
      dataIndex: "Wrork_State",
      key: "5",
      render(_, record: any) {
        let color = "";
        let name = "";
        let icon = <></>;
        if (record.Wrork_State === 0) {
          color = "orange";
          name = "در انتظار بررسی";
          icon = <CheckCircleOutlined />;
        } else if (record.Wrork_State === 3) {
          color = "success";
          name = "تایید شده";
          icon = <CheckCircleOutlined />;
        } else if (record.Wrork_State === 1) {
          color = "orange";
          name = "درحال بررسی";
          icon = <CheckCircleOutlined />;
        } else if (record.Wrork_State === 2) {
          color = "red";
          name = "ردشده";
          icon = <CheckCircleOutlined />;
        }

        return (
          <Tag className='p-1' icon={icon} color={color}>
            {name}
          </Tag>
        );
      },
    },
    {
      title: "عملیات",
      key: "عملیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record: any) => (
        <Space size="small">
          <VisitInfo
            CanEdit={record.CanEdit}
            href={"license_get_request/" + record.Request_Uid}
          >
            مشاهده اطلاعات
          </VisitInfo>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb
        titleIcon={<ClipboardDocumentListIcon className="w-8" />}
        pages={[{ label: "خانه", path: "/" }]}
        currentPage={"لیست درخواست مجوز ها"}
      />

      <Card>
        <WorkflowTable
          loading={list.isFetching}
          data={list.data?.tasks.Table}
          extraColumns={extraColumns}
        />
      </Card>
    </>
  );
};

export default Page;
