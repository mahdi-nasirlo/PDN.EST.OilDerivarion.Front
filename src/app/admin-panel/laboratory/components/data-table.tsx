"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Space, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import EditModal from "./edit-modal";
import CustomeTable from "../../../../../components/CustomeTable";
import StatusColumn from "../../../../../components/CustomeTable/StatusColumn";
import TestExpandedRowRender from "./test-expandedRowRender";
import GpsLabModal from "./gps-lab-modal";

export default function DataTable({
  setFilter,
  setModalVisible,
  ldMaterial,
  Laboratory,
  mutate,
}: {
  setFilter: (arg: any) => void;
  setModalVisible: any;
  ldMaterial: boolean;
  mutate: () => void;
  Laboratory:
  | {
    records: LaboratoryGet[];
    count: number;
  }
  | undefined;
}) {

  const [activeExpRow, setActiveExpRow] = useState<string[]>();

  // //حذف

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Laboratory | null>(null);

  const handleDelete = (record: Laboratory) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const { trigger: deleteLab, isMutating: ldDeleteLab } = useSWRMutation(
    "/Lab/Delete",
    mutationFetcher
  );

  const handleConfirmDelete = async () => {
    const res = await deleteLab({ Uid: recordToDelete?.uid });
    if (res) {

      await mutate();

      setIsDeleteModalVisible(false);

      setRecordToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setRecordToDelete(null);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  //ادیت

  const [isVisibleEditModal, setIsEditModalVisible] = useState<boolean>(false);
  const [recordToEdit, setRecordToEdit] = useState<Laboratory | null>(null);

  const handleEdit = (record: Laboratory) => {
    setRecordToEdit(record);
    setIsEditModalVisible(true);
  };

  // GPS

  const [isGPSModalVisible, setIsGPSModalVisible] = useState(false);

  const [selectedLabUid, setSelectedLabUid] = useState<string | null>(null);

  const handleGPS = (record: Laboratory) => {
    setSelectedLabUid(record.uid);
    setIsGPSModalVisible(true);
  };

  const columns: ColumnsType<Laboratory> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%"
    },
    {
      title: "نام آزمایشگاه",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "شماره ثابت",
      dataIndex: "tel",
      key: "3",
    },
    {
      title: "فعال/غیر فعال",
      dataIndex: "isActive",
      key: "4",
      render: (_, record: any) => <StatusColumn record={record} />
    },
    {
      title: "استان",
      dataIndex: "stateName",
      key: "5",
    },
    {
      title: "آدرس",
      dataIndex: "address",
      key: "6",
      render: (_, record) => (
        <Tooltip
          placement="top"
          title={<Typography>{record.address}</Typography>}
        >
          <Typography.Text
            className=" max-w-[250px]"
            ellipsis={true}
            style={{ width: "45px !important" }}
          >
            {record.address}
          </Typography.Text>
        </Tooltip>
      ),
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
      title: "فاکتور های آزمون",
      dataIndex: "testItems",
      key: "5",
      render: (_, record: Laboratory) => {
        let testItemNames = record.testItems?.map(item => item.name).join(', ');

        return (
          <Tooltip
            placement="top"
            title={<Typography>{testItemNames}</Typography>}
          >
            <Typography.Text
              className="max-w-[180px]"
              ellipsis={true}
              style={{ width: "40px !important" }}
            >
              {testItemNames}
            </Typography.Text>
          </Tooltip>
        );
      },
    },
    {
      title: "شماره مجوز",
      dataIndex: "license_No",
      key: "9",
    },
    {
      title: "تاریخ انقضاء",
      dataIndex: "licenseExpireDatePersian",
      key: "10",
    },
    {
      title: "فکس",
      dataIndex: "fax",
      key: "11",
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
            onClick={() => handleEdit(record)}
          >
            ویرایش
          </Button>
          {/* <Button
            type="link"
            className={"text-red-500 font-bold"}
            onClick={() => handleDelete(record)}
          >
            حذف
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="box-border w-full mt-8 p-6">
        <div className="flex justify-between items-center">
          <Typography className="text-right text-[16px] font-normal">
            لیست آزمایشگاه ها
          </Typography>
          <Button
            className="max-md:w-full flex items-center gap-2 justify-center"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={showModal}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex">افزودن آزمایشگاه</span>
          </Button>
        </div>
        <CustomeTable
          setInitialData={setFilter}
          columns={columns}
          isLoading={ldMaterial || ldDeleteLab}
          data={Laboratory}
          rowKey={"uid"}
          expandable={{
            expandedRowKeys: activeExpRow,
            onExpand: (expanded, record: Material) => {
              const keys: string[] = [];

              if (expanded && record.uid) {
                // @ts-ignore
                keys.push(record.uid);
              }

              if (!expanded) {
                keys.pop();
              }

              setActiveExpRow(keys);
            },
            expandedRowRender: (record: Laboratory) => (
              <TestExpandedRowRender Laboratory={record} TableMutate={mutate} />
            ),
          }}
        />
      </div>
      {/* جذف */}
      <ConfirmDeleteModal
        loading={ldDeleteLab}
        title="حذف آزمایشگاه"
        open={isDeleteModalVisible}
        setOpen={handleCancelDelete}
        handleDelete={handleConfirmDelete}
      />
      {/* ویرایش */}
      <EditModal
        mutate={mutate}
        recordToEdit={recordToEdit}
        setRecordToEdit={setRecordToEdit}
        isEditModalVisible={isVisibleEditModal}
        setIsEditModalVisible={setIsEditModalVisible}
      />
      {/* مشاهده موقعیت */}
      <GpsLabModal
        selectedLabUid={selectedLabUid}
        setSelectedLabUid={setSelectedLabUid}
        isGPSModalVisible={isGPSModalVisible}
        setIsGPSModalVisible={setIsGPSModalVisible}
      />
    </>
  );
}
