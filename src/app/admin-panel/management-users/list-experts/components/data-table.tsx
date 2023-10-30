import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, Typography, } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { addIndexToData } from "../../../../../../lib/addIndexToData";
import { GetPage_ExeManager, Person } from "../../../../../../interfaces/producer";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useForm } from "antd/es/form/Form";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";

export default function DataTable({
  setModalVisible,
}: {
  setModalVisible: any;
}) {
  //حذف

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const handleDelete = (record: any) => {
    setRecordToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete action here with recordToDelete
    // After successful delete, you can close the modal
    setIsDeleteModalVisible(false);
  };

  const [form] = useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);

  const handleEdit = (record: any) => {
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

  const { data, isLoading, isValidating } = useSWR<GetPage_ExeManager>(
    "/Producer/GetPage_ExeManager",
    (url) =>
      listFetcher(url, {
        arg: {
          fromRecord: 0,
          selectRecord: 100000,
        },
      })
  );

  const columns: ColumnsType<Person & { Row: number }> = [
    {
      title: "ردیف",
      dataIndex: "Row",
      key: "1",
    },
    {
      title: "نام کارشناس",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "کد ملی",
      dataIndex: "name",
      key: "3",
    },
    {
      title: "شماره همراه",
      dataIndex: "nationalCode",
      key: "4",
    },
    {
      title: "وضعیت",
      dataIndex: "ceoName",
      key: "5",
    },
    {
      title: "اداره مربوطه",
      dataIndex: "companyOwnershipTypeName",
      key: "6",
    },
    {
      title: "استان مربوطه",
      dataIndex: "status",
      key: "7",
    },
    {
      title: "عملیات",
      dataIndex: "عملیات",
      key: "8",
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
    <div className="box-border w-full p-6 mt-8">
      <div className="flex justify-between items-center">
        <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
          لیست کارشناسان
        </Typography>
        <Button
          className="max-md:w-full flex justify-center items-center gap-2"
          size="large"
          type="primary"
          htmlType="submit"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          <PlusIcon width={24} height={24} />
          <span className="flex">افزودن کارشناس</span>
        </Button>
      </div>
      <Table
        loading={isLoading || isValidating}
        className="mt-6"
        columns={columns}
        dataSource={addIndexToData(data?.records)}
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
      {/* جذف */}
      <ConfirmDeleteModal
        open={isDeleteModalVisible}
        setOpen={setIsDeleteModalVisible}
        handleDelete={handleConfirmDelete}
        title="حذف کارشناس"
        loading={false}
      />
      {/* ویرایش */}
      <Modal
        width={800}
        title="ویرایش کارشناس"
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
              <Form.Item name="year-establishment" label="نام کارشناس">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="year-establishment" label="کد ملی">
                <Input size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="year-establishment" label="شماره همراه">
                <Input size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="year-establishment" label="فعال/غیر فعال">
                <Select size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="year-establishment" label="اداره مربوطه">
                <Select size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="year-establishment" label="استان مربوطه">
                <Select size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
