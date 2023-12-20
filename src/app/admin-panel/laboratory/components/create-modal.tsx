"use client";

import { Button, Col, Form, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import LaboratoryForm from "./laboratory-form";
import useCreateLaboratory from "../../../../../hooks/laboratory/useCreateLaboratory";

export default function CreateModal({
  modalVisible,
  setModalVisible,
  mutate,
}: {
  modalVisible: any;
  setModalVisible: any;
  mutate: () => void;
}) {
  const [form] = useForm();

  const createLaboratoryRequest = useCreateLaboratory()

  const handleCreateLab = async (values: any) => {
    const res = await createLaboratoryRequest.trigger(values);

    if (res) {
      setModalVisible(false);

      await mutate();

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
          <div className="text-base mb-2">افزودن آزمایشگاه</div>
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
              loading={createLaboratoryRequest.isMutating}
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
              disabled={createLaboratoryRequest.isMutating}
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
        onFinish={handleCreateLab}
        disabled={createLaboratoryRequest.isMutating}
        form={form}
        layout="vertical"
        initialValues={{ testItems: [] }}
      >
        <LaboratoryForm />
      </Form>
    </Modal>
  );
}
