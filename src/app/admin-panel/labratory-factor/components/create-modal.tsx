"use client";

import { Button, Col, Form, Modal, Row, Select, } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { CategoryProduct } from "../../../../../interfaces/category-product";

export default function CreateModal({
  setModalVisible,
  modalVisible,
  mutate
}: {
  setModalVisible: any;
  modalVisible: any;
  mutate: () => void;
}) {


  const [form] = useForm();


  const { isMutating, trigger } = useSWRMutation(
    "/ProductCategory/Create",
    mutationFetcher
  );


  const handleFormSubmit = async (values: CategoryProduct) => {
    // @ts-ignore
    // form.resetFields();
    trigger(values);
    mutate();
    setModalVisible(false);
  };

  const { data, isLoading } = useSWR("/BaseInfo/GetAllTestMethod", listFetcher);


  const closeModal = () => {
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
              name="labUid"
              label="نام آزمایشگاه"
              rules={[
                {
                  required: true,
                  message: ".لطفا نام آزمایشگاه را وارد کنید",
                },
              ]}
            >
              <Select
                options={[]}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="testItemUid"
              label="نام فاکتور"
              rules={[
                {
                  required: true,
                  message: ".لطفا نام فاکتور را وارد کنید",
                },
              ]}
            >
              <Select
                fieldNames={{ label: "Name", value: "Uid" }}
                options={data}
                loading={isLoading}
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
