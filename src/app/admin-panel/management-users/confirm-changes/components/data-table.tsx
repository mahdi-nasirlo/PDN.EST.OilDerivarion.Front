"use client";

import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { UploadOutlined } from "@ant-design/icons";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Col, Form, Modal, Row, Select, Space, Table, Typography, Upload, } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import StatusColumn from "../../../../../../components/CustomeTable/StatusColumn";

interface DataType {
  key: string;
  Row: number;
  Name: string;
  LName: string;
  UserRole: string;
  Status: string;
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

  const showModal = () => {
    setModalVisible(true);
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
      width: "5%"
    },
    {
      title: "نام",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "LName",
      key: "3",
    },
    {
      title: "نقش کاربر",
      dataIndex: "UserRole",
      key: "4",
    },
    {
      title: "فعال/غیر فعال",
      dataIndex: "Status",
      key: "5",
      render: (_, record) => <StatusColumn record={record} />
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
            className="text-red-500 font-bold"
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
          <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
            لیست کاربران
          </Typography>
          <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={showModal}
          >
            <PlusIcon width={24} height={24} />
            <span className="flex">ثبت تغییرات</span>
          </Button>
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
        loading={false}
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="حذف کاربر"
      />
      {/* ویرایش */}
      <Modal
        width={800}
        title="ویرایش کاربر"
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
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="year-establishment" label="نام/ نقش کاربر">
                <Select
                  size="large"
                  placeholder="انتخاب کنید"
                  tokenSeparators={[","]}
                  mode="multiple"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="year-establishment" label="فعال / غیر فعال">
                <Select size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col md={24}>
              <Form.Item name="year-establishment" label="آپلود سند">
                <Upload
                  multiple={false}
                  maxCount={1}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  className="w-full"
                >
                  <Button icon={<UploadOutlined />}>بارگزاری نمایید</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col md={24}>
              <Form.Item label="آپلود سند" name="establishment">
                <TextArea
                  placeholder="توضیحات"
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
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
    LName: "خالویی",
    UserRole: "مدیر کل",
    Status: "مسدود",
  },
  {
    key: "2",
    Row: 2,
    Name: "حسام",
    LName: "خالویی",
    UserRole: "مدیر کل",
    Status: "رفع مسدودی",
  },
  {
    key: "3",
    Row: 3,
    Name: "حسام",
    LName: "خالویی",
    UserRole: "مدیر کل",
    Status: "غیر فعال",
  },
];
