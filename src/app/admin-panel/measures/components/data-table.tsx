"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { addIndexToData } from "../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { Measure } from "../../../../../interfaces/measures";
import EditModal from "../../measures/components/edit-modal";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function DataTable({
  isValidating,
  setModalVisible,
  ldMeasure,
  measure,
  mutate,
}: {
  isValidating: any;
  setModalVisible: any;
  ldMeasure: boolean;
  mutate: () => void;
  measure:
    | {
        records: Measure[];
        count: number;
      }
    | undefined;
}) {
  const [openEdit, setOpenEdit] = useState<Measure | undefined>(undefined);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Measure | null>(null);

  const handleDelete = (record: Measure) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const { trigger, isMutating: IsDeleteMeasure } = useSWRMutation(
    "/Measure/Delete",
    mutationFetcher
  );

  const handleConfirmDelete = async () => {
    await trigger({
      uid: recordToDelete?.Uid,
    });

    await mutate();
    setIsDeleteModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const columns: ColumnsType<Measure> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "واحد اندازه گیری",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "فعال/غیر فعال",
      dataIndex: "IsActive",
      key: "4",
      render: (_, record: any) => {
        let color = "";
        let name = "";
        let icon = <></>;
        if (record.IsActive === false) {
          color = "red";
          name = "غیرفعال";
          icon = <CloseCircleOutlined />;
        } else {
          color = "success";
          name = "فعال";
          icon = <CheckCircleOutlined />;
        }

        return (
          <Tag icon={icon} color={color}>
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
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            className={"text-secondary-500 font-bold"}
            onClick={() => setOpenEdit(record)}
          >
            ویرایش
          </Button>
          <Button
            type="link"
            className={"text-red-500 font-bold"}
            onClick={() => handleDelete(record)}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="text-right text-[16px] font-normal">
            لیست واحد های اندازه گیری
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={showModal}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex  ">افزودن واحد اندازه گیری</span>
          </Button>
        </div>
        <Table
          className="mt-6"
          columns={columns}
          loading={ldMeasure || IsDeleteMeasure || isValidating}
          dataSource={addIndexToData(measure?.records)}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            defaultCurrent: 1,
            style: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              margin: "16px 0",
            },
          }}
        />
        <EditModal
          mutate={mutate}
          editRecords={openEdit}
          setEditRecord={setOpenEdit}
        />
      </div>
      <ConfirmDeleteModal
        loading={IsDeleteMeasure}
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="واحد اندازه گیری"
      />
    </>
  );
}
