"use client";

import { Button, Col, Modal, Row, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import { Gps } from "../../../../../interfaces/gps";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import EditModal from "@/app/admin-panel/gps-devices/components/edit-modal";
import StatusColumn from "../../../../../components/CustomeTable/StatusColumn";
import CustomeTable from "../../../../../components/CustomeTable";

interface DataType {
  key: string;
  Row: number;
  ProductName: string;
  TrackingCode: string;
  ConfirmedRequestCode: string;
}

export default function DataTable({
  setFilter,
  isValidating,
  isLoading,
  boxesData,
  mutate,
}: {
  setFilter: (arg: any) => void;
  isValidating: any;
  isLoading: boolean;
  boxesData:
    | {
        records: any;
        count: number;
      }
    | undefined;
  mutate: () => void;
}) {
  const iframeRef = useRef(null);

  // Function to refresh the iframe
  const refreshIframe = () => {
    if (iframeRef.current) {
      (iframeRef.current as HTMLIFrameElement).src = (
        iframeRef.current as HTMLIFrameElement
      ).src;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(refreshIframe, 30000); // 10 seconds in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  //حذف

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Gps | null>(null);

  //ادیت
  const [recordToEdit, setRecordToEdit] = useState<Gps>();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // مشاهده موقعیت

  const [isGPSModalVisible, setIsGPSEditModalVisible] = useState(false);

  const handleGPS = (record: any) => {
    setIsGPSEditModalVisible(true);
    setRecordToEdit(record.Uid);
  };

  const handleCancelGPS = () => {
    setIsGPSEditModalVisible(false);
  };

  const { trigger, isMutating } = useSWRMutation(
    "/GpsDevice/Delete",
    mutationFetcher
  );

  const handleDeleteSubmit = async () => {
    await trigger({ uid: recordToDelete?.Uid });

    setIsDeleteModalVisible(false);

    await mutate();
  };

  const columns: ColumnsType<Gps> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
      width: "5%",
    },
    {
      title: "کد",
      dataIndex: "Code",
      key: "2",
    },
    // {
    //       title: "استان",
    //       dataIndex: "TrackingCode",
    //       key: "3",
    // },
    {
      title: "فعال/غیر فعال ",
      dataIndex: "IsActive",
      key: "3",
      render: (e, record) => <StatusColumn record={record} />,
    },
    {
      title: "مکان یابی",
      dataIndex: "ConfirmedRequest",
      key: "4",
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
            onClick={() => {
              setIsEditModalVisible(true);
              setRecordToEdit(record);
            }}
          >
            ویرایش
          </Button>
          <Button
            type="link"
            className="text-red-500 font-bold"
            onClick={() => {
              setIsDeleteModalVisible(true);
              setRecordToDelete(record);
            }}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <CustomeTable
        setInitialData={setFilter}
        isLoading={isLoading || isMutating || isValidating}
        data={boxesData}
        columns={columns}
      />
      {/* جذف */}
      <ConfirmDeleteModal
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleDeleteSubmit}
        title={"حذف جعبه"}
        loading={isMutating}
      />
      {/* ویرایش */}
      <EditModal
        recordeToEdit={recordToEdit}
        setModalVisible={setIsEditModalVisible}
        modalVisible={isEditModalVisible}
        mutate={mutate}
      />
      {/* مشاهده موقعیت */}
      <Modal
        title="مشاهده موقعیت"
        visible={isGPSModalVisible}
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
        <iframe
          ref={iframeRef}
          className="w-full h-[480px] border-solid"
          src={`https://map-test.pdnsoftware.ir/oil/boxonmap?device=C8A4E7DB-5783-4CEB-8DF0-C0EC1BF0C5DA`}
        ></iframe>
      </Modal>
    </>
  );
}
