"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Col, Modal, Row, Space, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import EditModal from "./edit-modal";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import CustomeTable from "../../../../../components/CustomeTable";

export default function DataTable({
  setFilter,
  setModalVisible,
  ldMaterial,
  labratory,
  mutate,
}: {
  setFilter: (arg: any) => void;
  setModalVisible: any;
  ldMaterial: boolean;
  mutate: () => void;
  labratory:
    | {
        records: LaboratoryGet[];
        count: number;
      }
    | undefined;
}) {
  // //حذف

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Labratory | null>(null);

  const handleDelete = (record: Labratory) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const { trigger: deleteLab, isMutating: ldDeleteLab } = useSWRMutation(
    "/Lab/Delete",
    mutationFetcher
  );

  const handleConfirmDelete = async () => {
    await deleteLab({
      Uid: recordToDelete?.Uid,
    });

    await mutate();

    setIsDeleteModalVisible(false);

    setRecordToDelete(null);
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
  const [recordToEdit, setRecordToEdit] = useState<Labratory | null>(null);

  const handleEdit = (record: Labratory) => {
    setRecordToEdit(record);
    setIsEditModalVisible(true);
  };

  // GPS

  const [isGPSModalVisible, setIsGPSEditModalVisible] = useState(false);

  // const handleGPS = () => {
  //   setIsGPSEditModalVisible(true);
  // };
  const [selectedLabUid, setSelectedLabUid] = useState<string | null>(null);

  const handleGPS = (record: Labratory) => {
    setSelectedLabUid(record.Uid);
    setIsGPSEditModalVisible(true);
  };
  const handleCancelGPS = () => {
    setIsGPSEditModalVisible(false);
  };

  const columns: ColumnsType<Labratory> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "نام آزمایشگاه",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "شماره ثابت",
      dataIndex: "Tel",
      key: "3",
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
      title: "استان",
      dataIndex: "StateName",
      key: "5",
    },
    {
      title: "آدرس",
      dataIndex: "Address",
      key: "6",
    },
    {
      title: "موقعیت جغرافیایی",
      dataIndex: "Test",
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
      title: "شماره مجوز",
      dataIndex: "License_No",
      key: "8",
    },
    {
      title: "تاریخ انقضاء",
      dataIndex: "License_Expire_Date",
      key: "9",
    },
    {
      title: "فکس",
      dataIndex: "Fax",
      key: "10",
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
            className="text-secondary-500 font-bold"
            onClick={() => handleEdit(record)}
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
          isLoading={ldMaterial || ldDeleteLab}
          data={labratory}
          columns={columns}
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
        setIsEditModalVisible={setIsEditModalVisible}
        isEditModalVisible={isVisibleEditModal}
        setRecordToEdit={setRecordToEdit}
      />
      {/* مشاهده موقعیت */}
      <Modal
        title="مشاهده موقعیت"
        open={isGPSModalVisible}
        onCancel={handleCancelGPS}
        width={800}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={24}>
              <Button
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={handleCancelGPS}
                key={"cancel"}
              >
                برگشت
              </Button>
            </Col>
          </Row>,
        ]}
      >
        {" "}
        <Row gutter={[32, 1]}>
          <Col xs={24} md={24}>
            <iframe
              // src={`https://map-test.pdnsoftware.ir/${selectedLabUid}`}
              src={`https://map-test.pdnsoftware.ir/`}
              aria-hidden="false"
              className="w-full h-[480px] border-solid"
            ></iframe>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
