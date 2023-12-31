"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";

export default function CreateModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: any;
  setModalVisible: any;
}) {
  const [form] = useForm();

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values); // Log the form values to the console
      closeModal();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };
  return (
    <Modal
      width={800}
      title={
        <div>
          <div className="text-base mb-2">افزودن کارشناس</div>
        </div>
      }
      open={modalVisible}
      onCancel={closeModal}
      footer={[
        <Row key={"box"} gutter={[16, 16]} className="my-2">
          <Col xs={12} md={12}>
            <Button
              size="large"
              className="w-full"
              type="primary"
              onClick={handleFormSubmit}
              key={"submit"}
            >
              ثبت
            </Button>
          </Col>
          <Col xs={12} md={12}>
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
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="year-establishment" label="نام کارشناس">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="year-establishment" label="شماره ملی">
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
  );
}
