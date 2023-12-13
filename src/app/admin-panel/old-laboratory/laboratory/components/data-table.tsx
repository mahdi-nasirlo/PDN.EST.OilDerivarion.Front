"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Col, Modal, Row, Space, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import EditModal from "./edit-modal";
import CustomeTable from "../../../../../../components/CustomeTable";
import StatusColumn from "../../../../../../components/CustomeTable/StatusColumn";

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
    const res = await deleteLab({ uid: recordToDelete?.uid });
    if (res) {

      await mutate();

      setIsDeleteModalVisible(false);
    }
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
  const [recordToEdit, setRecordToEdit] = useState<Laboratory | null>(null);

  const handleEdit = (record: Laboratory) => {
    setRecordToEdit(record);
    setIsEditModalVisible(true);
  };

  // GPS

  const [isGPSModalVisible, setIsGPSEditModalVisible] = useState(false);

  // const handleGPS = () => {
  //   setIsGPSEditModalVisible(true);
  // };
  const [selectedLabUid, setSelectedLabUid] = useState<string | null>(null);

  const handleGPS = (record: Laboratory) => {
    setSelectedLabUid(record.uid);
    setIsGPSEditModalVisible(true);
  };
  const handleCancelGPS = () => {
    setIsGPSEditModalVisible(false);
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
    // {
    //   title: "فاکتور آزمون",
    //   dataIndex: "testItems",
    //   key: "8",
    //   render: (_, record) => (
    //     <Tooltip
    //       placement="top"
    //       title={<Typography>{record.testItems}</Typography>}
    //     >
    //       <Typography.Text
    //         className=" max-w-[200px]"
    //         ellipsis={true}
    //         style={{ width: "40px !important" }}
    //       >
    //         {record.testItems}
    //       </Typography.Text>
    //     </Tooltip>
    //   ),
    // },
    {
      title: "شماره مجوز",
      dataIndex: "license_No",
      key: "9",
    },
    {
      title: "تاریخ انقضاء",
      dataIndex: "license_Expire_Date",
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
          isLoading={ldMaterial || ldDeleteLab}
          data={Laboratory}
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
        <Row gutter={[32, 1]}>
          <Col xs={24} md={24}>
            <iframe
              src={`https://map-test.pdnsoftware.ir/oil/lab?code=${selectedLabUid}`}
              aria-hidden="false"
              className="w-full h-[480px] border-solid"
            ></iframe>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
