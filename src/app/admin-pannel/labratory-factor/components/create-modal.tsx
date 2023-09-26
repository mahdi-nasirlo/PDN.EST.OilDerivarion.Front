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
          <div className="text-base mb-2"> افزودن فاکتور آزمایشگاه</div>
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
              name="is_Active"
              label="نام آزمایشگاه"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select options={[]} size="large" placeholder="انتخاب کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="hasDensity"
              label="نام فاکتور"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                options={[]}
                value={selectedDensity}
                onChange={(value) => setSelectedDensity(value)}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
