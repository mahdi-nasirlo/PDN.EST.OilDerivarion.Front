"use client";

import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

interface DataType {
  key: string;
  Row: number;
  Name: string;
  LastName: string;
  Code: string;
  UserName: string;
  State: string;
  City: string;
  Role: string;
}

export default function DataTable({
  setModalVisible,
}: {
  setModalVisible: any;
}) {
  //حذف

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<DataType | null>(null);

  const handleDelete = (record: DataType) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete action here with recordToDelete
    // After successful delete, you can close the modal
    setIsDeleteModalVisible(false);
  };

  //ادیت
  const [form] = useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<DataType | null>(null);

  const handleEdit = (record: DataType) => {
    setRecordToEdit(record);
    setIsEditModalVisible(true);
  };
  const handleConfirmEdit = () => {
    // Perform the edit action here with recordToEdit
    // After successful edit, you can close the modal
    setIsEditModalVisible(false);
  };
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setRecordToEdit(null); // Clear the recordToEdit
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "نام",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "LastName",
      key: "3",
    },
    {
      title: "کد ملی",
      dataIndex: "Code",
      key: "4",
    },
    {
      title: "شناسه کاربری",
      dataIndex: "UserName",
      key: "5",
    },
    {
      title: "استان",
      dataIndex: "State",
      key: "6",
    },
    {
      title: "شهر",
      dataIndex: "City",
      key: "7",
    },
    {
      title: "نقش",
      dataIndex: "Role",
      key: "7",
    },
    {
      title: "جزئیات",
      key: "جزئیات",
      align: "center",
      fixed: 'right',
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
        <div className="flex justify-start">
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست نقش کاربران
          </Typography>
        </div>
        <Table
          className="mt-6"
          columns={columns}
          dataSource={data}
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
      </div>
      {/* جذف */}
      <ConfirmDeleteModal
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="نقش"
      />
      {/* ویرایش */}
      <Modal
        width={800}
        title="ویرایش نقش"
        visible={isEditModalVisible}
        onOk={handleConfirmEdit}
        onCancel={handleCancelEdit}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={12}>
              <Button
                size="large"
                className="w-full"
                type="primary"
                onClick={handleConfirmEdit}
                key={"submit"}
              >
                ثبت
              </Button>
            </Col>
            <Col xs={24} md={12}>
              <Button
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={handleCancelEdit}
                key={"cancel"}
              >
                انصراف
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Row gutter={[32, 1]}>
            <Col xs={24} md={12}>
              <Form.Item name="years" label="نام و نام خانوادگی">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="year" label="نام نقش">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

const data: DataType[] = [
  {
    key: "1",
    Row: 1,
    Name: "حسام",
    LastName: "خالویی",
    Code: "2063069022",
    UserName: "Hesam",
    State: "مازندران",
    City: "بابل",
    Role: "-",
  },
  {
    key: "2",
    Row: 2,
    Name: "حسام",
    LastName: "خالویی",
    Code: "2063069022",
    UserName: "Hesam",
    State: "مازندران",
    City: "بابل",
    Role: "مدیر",
  },
];
