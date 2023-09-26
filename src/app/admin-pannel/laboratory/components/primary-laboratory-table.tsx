"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { addIndexToData } from "../../../../../lib/addIndexToData";

interface DataType {
  key: string;
  Row: number;
  NameLaboratory: string;
  NameCEO: string;
  phoneLaboratory: string;
  code: string;
  Address: string;
  fax: string;
  tel: string;
}
export default function PrimaryLaboratoryTable({
  setModalVisible,
}: {
  setModalVisible: any;
}) {
  const { isLoading: ldFactor, data: factors } = useSWR<{
    count: number;
    records: any[];
  }>("/Lab/GetPage", (url) =>
    listFetcher(url, {
      arg: {
        name: "",
        is_Active: true,
        fromRecord: 0,
        selectRecord: 10000,
      },
    })
  );
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
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setRecordToDelete(null); // Clear the recordToDelete
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
    },
    {
      title: "نام آزمایشگاه",
      dataIndex: "Name",
      key: "2",
    },
    {
      title: "استان مربوطه",
      dataIndex: "StateName",
      key: "3",
    },
    {
      title: "شماره گواهینامه",
      dataIndex: "License_No",
      key: "4",
    },
    {
      title: "تاریخ گواهینامه",
      dataIndex: "code",
      key: "5",
    },
    {
      title: "تلفن",
      dataIndex: "fax",
      key: "6",
    },
    {
      title: "فکس",
      dataIndex: "fax",
      key: "7",
    },

    {
      title: "آدرس",
      dataIndex: "Address",
      key: "8",
    },
    {
      title: "عملیات",
      key: "عملیات",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
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
        <div className="flex justify-end">
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
        <Table
          scroll={{ x: 1500, y: 300 }}
          dataSource={addIndexToData(factors?.records)}
          className="mt-6"
          columns={columns}
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
      <Modal
        width={600}
        footer={[
          <Row key={"box"} gutter={[16, 16]} className="my-2">
            <Col xs={24} md={12}>
              <Button
                size="large"
                className="w-full bg-red-500"
                type="primary"
                onClick={handleConfirmDelete}
                key={"submit"}
              >
                حذف
              </Button>
            </Col>
            <Col xs={24} md={12}>
              <Button
                size="large"
                className="w-full bg-gray-100 text-warmGray-500"
                onClick={handleConfirmDelete}
                key={"cancel"}
              >
                انصراف
              </Button>
            </Col>
          </Row>,
        ]}
        title="حذف آزمایشگاه"
        visible={isDeleteModalVisible}
        onCancel={handleCancelDelete}
      >
        <p>آیا از حذف این آزمایشگاه مطمئن هستید؟</p>
      </Modal>
      {/* ویرایش */}
      <Modal
        width={800}
        title="ویرایش آزمایشگاه"
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
          مشخصات آزمایشگاه
          <Row gutter={[32, 1]}>
            <Col xs={24} md={12}>
              <Form.Item name="year" label="نام آزمایشگاه">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="years" label="شماره ثابت">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 1]}>
            <Col xs={24} md={12}>
              <Form.Item name="yeard" label="مشخصه یکتای جواز">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="yearb" label="عکس جواز کسب (پروانه بهره برداری)">
                <Select size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 1]}>
            <Col xs={24} md={12}>
              <Form.Item name="yearm" label="فعال/غیر فعال">
                <Select size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 1]}>
            <Col xs={24} md={24}>
              <Form.Item name="yearm" label="آدرس">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="Test" label="فاکتور آزمون">
                <Select size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          مشخصات فرد مسئول
          <Row gutter={[32, 1]}>
            <Col xs={24} md={12}>
              <Form.Item name="Name" label="نام">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="lastName" label="نام خانوادگی">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 1]}>
            <Col xs={24} md={12}>
              <Form.Item name="code" label="کد ملی">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="phone" label="شماره موبایل">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          مشخصات مدیر
          <Row gutter={[32, 1]}>
            <Col xs={24} md={12}>
              <Form.Item name="Name" label="نام">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="lastName" label="نام خانوادگی">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 1]}>
            <Col xs={24} md={12}>
              <Form.Item name="code" label="کد ملی">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="phone" label="شماره موبایل">
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
    NameLaboratory: "پژوهشگاه صنعت نفت",
    NameCEO: "تهران",
    phoneLaboratory: "T/3188",
    code: "1402/06/21",
    tel: "02148255173",
    fax: "02144739712",
    Address:
      "تهران,بلوار غربی مجموعه ورزشی آزادی,پژوهشگاه صنعت نفت کدپستی:1485613111",
  },
  {
    key: "2",
    Row: 2,
    NameLaboratory: "نوین نت پارس (روغن)",
    NameCEO: "تهران",
    phoneLaboratory: "NACI/Lab/1457",
    code: "1402/09/22",
    tel: "٠٢١٨٨٥٢٢١٢٨",
    fax: "02188522127",
    Address:
      "تهران، خيابان شهيد بهشتي، خيابان شهيد صابونچي، كوچه" +
      "مبيني، پلاك ،٣٤ آزمايشگاه نوين نت پارس كدپستي" +
      "١٥٣٣٦٦٤٣٣٦1485613111",
  },
];
