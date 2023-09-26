"use client";

import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { CategoryProduct } from "../../../../../interfaces/category-product";

export default function CreateModal({
  setModalVisible,
  modalVisible,
}: {
  setModalVisible: any;
  modalVisible: any;
}) {
  const [selectedDensity, setSelectedDensity] = useState<boolean>(false);

  const handleDensityChange = (value: any) => {
    setSelectedDensity(value);
  };

  const { isMutating, trigger } = useSWRMutation(
    "/ProductCategory/Create",
    mutationFetcher
  );
  const { data, isLoading } = useSWR("/BaseInfo/GetAllTestMethod", listFetcher);

  const [form] = useForm();

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async (values: CategoryProduct) => {
    // @ts-ignore
    form.resetFields();
    trigger(values);
    mutate;
    setModalVisible(false);
  };

  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">افزودن دسته بندی جدید</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      open={modalVisible}
      onCancel={closeModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24} md={12}>
            <Button
              onClick={() => {
                form.submit();
              }}
              size="large"
              className="w-full"
              type="primary"
              key={"submit"}
              loading={isMutating}
            >
              ثبت
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Button
              size="large"
              className="w-full bg-gray-100 text-warmGray-500"
              onClick={closeModal}
              key={"cancel"}
            >
              انصراف
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Form
        onFinish={handleFormSubmit}
        disabled={isMutating}
        form={form}
        layout="vertical"
      >
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="نام دسته بندی"
              rules={[
                {
                  required: true,
                  message: ".لطفا نام را وارد کنید",
                },
                {
                  type: "string",
                },
              ]}
            >
              <Input size="large" placeholder="انتخاب کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="testMethodId"
              label="روش تولید"
              rules={[
                { required: true, message: ".لظفا روش تولید را انتخاب نمایید" },
              ]}
            >
              <Select
                loading={isLoading}
                options={data}
                fieldNames={{ label: "Name", value: "Id" }}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="is_Active"
              label="فعال/غیر فعال"
              rules={[
                {
                  required: true,
                  message: ".لطفا وضغیت فعال/غیرفعال بودن را انتخاب نمایید",
                },
              ]}
            >
              <Select
                options={[
                  { label: "فعال", value: true },
                  { label: "غیرفعال", value: false },
                ]}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="hasDensity"
              label="دانسیته"
              rules={[
                {
                  required: true,
                  message: ".لطفا دانسیته را انتخاب نمایید ",
                },
              ]}
            >
              <Select
                options={[
                  { label: "دارد", value: true },
                  { label: "ندارد", value: false },
                ]}
                value={selectedDensity}
                onChange={(value) => setSelectedDensity(value)}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}></Row>
        {selectedDensity === true && (
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="densityUpperLimit"
                label="حد بالا دانسیته"
                rules={[
                  {
                    required: true,
                    message: ".لطفا حد بالا دانسیته را وارد نمایید",
                  },
                  {
                    type: "number",
                    message: ".باید به صورت عدد باشد",
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  size="large"
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="densityLowerLimit"
                label="حد پایین دانسیته"
                rules={[
                  {
                    required: true,
                    message: ".لطفا حد پایین دانسیته را وارد نمایید",
                  },
                  {
                    type: "number",
                    message: ".باید به صورت عدد باشد ",
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  size="large"
                  placeholder="وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
}
