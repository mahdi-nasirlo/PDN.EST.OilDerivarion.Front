"use client";

import { Button, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { TestItem } from "../../../../../interfaces/TestItem";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import StatusColumn from "../../../../../components/CustomeTable/StatusColumn";
import CustomeTable from "../../../../../components/CustomeTable";
import { Producer } from "../../../../../interfaces/producer";
import Link from "next/link";

export default function DataTable({
  setModalVisible,
  ldTestItem,
  Producer,
  mutate,
  setFilter,
}: {
  setFilter: (arg: any) => void;
  setModalVisible: any;
  ldTestItem: boolean;
  mutate: () => void;
  Producer:
  | {
    records: Producer[];
    count: number;
  }
  | undefined;
}) {
  const [openEdit, setOpenEdit] = useState<TestItem | undefined>(undefined);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<TestItem | null>(null);

  const handleDelete = (record: TestItem) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const { trigger, isMutating: IsDeleteTestFactor } = useSWRMutation(
    "/TestItem/Delete",
    mutationFetcher
  );

  const handleConfirmDelete = async () => {
    const res = await trigger({ uid: recordToDelete?.uid });

    if (res) {
      await mutate();

      setIsDeleteModalVisible(false);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const columns: ColumnsType<Producer> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%"
    },
    {
      title: "نام تواید کننده",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "3",
    },
    {
      title: "وضعیت تولید کننده",
      dataIndex: "ProducerStatusName",
      key: "4",
      render: (e, record) => <StatusColumn record={record} />,
    },
    {
      title: "نام استان",
      dataIndex: "StateName",
      key: "5",
    },

    {
      title: "جزئیات",
      key: "جزئیات",
      align: "center",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            className="text-secondary-500 font-bold"
          >
            <Link href={"/admin-panel/producer-info"}>
              مشاهده اطلاعات
            </Link>
          </Button>
        </Space >
      ),
    },
  ];

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="text-right text-[16px] font-normal">
            لیست تولید کننده ها
          </Typography>
        </div>
        <CustomeTable
          isLoading={ldTestItem}
          columns={columns}
          data={Producer}
          setInitialData={setFilter}
        />
      </div>
    </>
  );
}
