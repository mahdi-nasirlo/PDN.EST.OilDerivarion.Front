import React, { useEffect, useState } from "react";
import { Card } from "@/components/card";
import CustomTable from "@/components/custom-table";
import { PlusIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import StatusColumn from "@/components/custom-table/StatusColumn";
import { Button, Space, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { z } from "zod";
import { productApi } from "constance/product";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useProductDelete from "@/hooks/basic/product/use-product-delete";
import useBaseInfoGetAllMainMember from "@/hooks/base-info/use-base-info-get-all-main-member";
import EditModal from "./edit-modal";
import baseInfoApi from "constance/base-info";

const apiData = baseInfoApi.GetAllMainMember;

export default function DataTable({
  setModalVisible,
  modalVisible,
}: {
  modalVisible: any;
  setModalVisible: any;
}) {
  const list = useBaseInfoGetAllMainMember();
  const [uidEdit, setGetUidEdit] = useState<string | boolean>();

  const [recordToEdit, setRecordToEdit] = useState<
    z.infer<typeof apiData.item> | boolean
  >();

  const columns: ColumnsType<z.infer<typeof apiData.item>> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "نام",
      dataIndex: "first_Name",
      key: "2",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "last_Name",
      key: "3",
    },
    {
      title: "شماره ملی",
      dataIndex: "national_Code",
      key: "4",
    },
    {
      title: "تاریخ تولد",
      dataIndex: "birthDate",
      key: "5",
    },
    {
      title: "سمت",
      dataIndex: "company_Role_Name",
      key: "6",
    },
    {
      title: "شماره تماس",
      dataIndex: "mobile",
      key: "7",
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
            onClick={() => setRecordToEdit(record)}
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
            text: "لیست اطلاعات مدیریتی",
            actions: [
              <Button
                key={"1"}
                className="flex justify- items-center gap-2"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setModalVisible(true);
                }}
              >
                <PlusIcon width={24} height={24} />
                <span className="flex">افزودن</span>
              </Button>,
            ],
          }}
          //   setInitialData={setPaginate}
          isLoading={list.isLoading}
          data={{ records: list?.data }}
          columns={columns}
        />
      </Card>
      <EditModal
        setRecordToEdit={setRecordToEdit}
        recordToEdit={recordToEdit}
      />
    </>
  );
}
