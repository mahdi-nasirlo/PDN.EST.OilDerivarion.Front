"use client";

import { Button, Col, Form, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import TestFactorForm from "@/app/admin-panel/test-factors/components/test-factor-form";
import useCreateTestFactors from "../../../../../hooks/test-factors/useCreateTestFactors";

export default function CreateModal({
  setModalVisible,
  modalVisible,
  mutate,
}: {
  setModalVisible: any;
  mutate: () => void;
  modalVisible: any;
}) {
  const [form] = useForm();

  const createTestItemRequest = useCreateTestFactors()

  const createTestFactor = async (values: any) => {

    const res = await createTestItemRequest.trigger(values);

    if (res) {
      await mutate();

      setModalVisible(false);

      form.resetFields();
    }
  };

  const CloseModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">افزودن فاکتور آزمون</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      open={modalVisible}
      onCancel={CloseModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24} md={12}>
            <Button
              loading={createTestItemRequest.isMutating}
              size="large"
              className="w-full"
              type="primary"
              onClick={() => form.submit()}
              key={"submit"}
            >
              ثبت
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Button
              disabled={createTestItemRequest.isMutating}
              size="large"
              className="w-full bg-gray-100 text-warmGray-500"
              onClick={CloseModal}
              key={"cancel"}
            >
              انصراف
            </Button>
          </Col>
        </Row>,
      ]}
    >
      <Form
        disabled={createTestItemRequest.isMutating}
        onFinish={createTestFactor}
        form={form}
        layout="vertical"
      >
        <TestFactorForm />
      </Form>
    </Modal>
  );
}
