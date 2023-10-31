import React from "react";
import { Col, Form, FormInstance, Input, Row } from "antd";

function Step3({
  form,
  handleSubmit,
  isLoading,
}: {
  isLoading: boolean;
  form: FormInstance;
  handleSubmit: (values: SaveFormManager) => void;
}) {
  return (
    <>
      <Form
        disabled={isLoading}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="managerFirstName"
              label="نام"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="managerLastName"
              label="نام خانوادگی"
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="managerNationalCode"
              label="کد ملی"
              rules={[
                { required: true },
                { min: 10, max: 10, message: "کد ملی باید ده رقمی باشد" },
              ]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="managerMobile"
              label="شماره موبایل"
              rules={[{ required: true }]}
            >
              <Input type="number" size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Step3;
