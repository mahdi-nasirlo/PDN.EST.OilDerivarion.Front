"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { CreateTestItemDetail } from "../../../../../interfaces/TestItem";
import { useForm } from "antd/es/form/Form";
import TestFeatureForm from "./test-feature-form";

export default function CreateModal({
  setModalVisible,
  modalVisible,
  mutate,
}: {
  setModalVisible: any;
  modalVisible: any;
  mutate: () => void;
}) {
  const [form] = useForm();

  const { trigger, isMutating } = useSWRMutation(
    "/TestItemDetail/Create",
    mutationFetcher
  );

  const createTestFactor = async (values: CreateTestItemDetail) => {
    await trigger(values);

    await mutate();

    setModalVisible(false);

    form.resetFields();
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
          <div className="text-base mb-2">افزودن ویژگی فاکتور جدید</div>
          <div className="font-normal text-sm">
            لطفا اطلاعات را وارد نمایید.
          </div>
        </div>
      }
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={24} md={12}>
            <Button
              size="large"
              className="w-full"
              type="primary"
              onClick={() => form.submit()}
              key="submit"
            >
              ثبت
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Button
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
        onFinish={createTestFactor}
        disabled={isMutating}
        form={form}
        layout="vertical"
      >
        <TestFeatureForm />
      </Form>
    </Modal>
  );
}
