import React from "react";
import { Col, Form, FormInstance, Input, Row } from "antd";

function Step2({
  form,
  handleSubmit,
  isLoading,
}: {
  isLoading: boolean;
  form: FormInstance;
  handleSubmit: (values: SaveFormResponsible) => void;
}) {
  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        disabled={isLoading}
        layout="vertical"
      >
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="responsibleFirstName"
              label="نام"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="responsibleLastName"
              label="نام خانوادگی"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[
                { required: true },
                { min: 10, max: 10, message: "کد ملی باید ده رقمی باشد" },
              ]}
              name="responsibleNationalCode"
              label="کد ملی"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="responsibleMobile"
              label="شماره موبایل"
            >
              <Input type="number" size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Step2;
