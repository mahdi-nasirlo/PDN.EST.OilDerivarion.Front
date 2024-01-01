"use client";

import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";

export default function PrimaryRequestsDetailsModalSubmit(
  {
    modalVisible,
    setModalVisible,
  }: {
    modalVisible: any;
    setModalVisible: any;
  }
) {
  const [form] = useForm();

  const closeModal = () => {
    // setModalVisible(false);
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
    <>
      <Modal
        width={800}
        title={
          <div>
            <div className="text-base mb-2">تعیین کارشناسان</div>
            <div className="font-normal text-sm">
              لطفا کارشناسان را انتخاب نموده و تایید نمایید.
            </div>
          </div>
        }
        visible={true}
        // visible={modalVisible}
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
                بازگشت
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Typography className="mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
            تعیین کارگروه
          </Typography>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item name="establishment" label="نماینده استاندارد استان">
                <Select size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item name="establishment" label="نماینده صمت استان">
                <Select size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item name="establishment" label="نماینده نفت استان">
                <Select size="large" placeholder="انتخاب کنید" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal >
    </>
  );
}
