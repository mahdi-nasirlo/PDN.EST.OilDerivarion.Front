import React from "react";
import { Col, Form, FormInstance, Input, Row } from "antd";
import ContactInputs from "../../../../../../../components/inputs/Contact";

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
        <Row gutter={[16, 16]}>
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
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="managerNationalCode"
              label="شماره ملی"
              rules={[
                { required: true },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "شماره ملی نامعتبر است",
                },
              ]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <ContactInputs label="شماره موبایل" name="managerMobile">
              <Input size="large" placeholder="وارد کنید" />
            </ContactInputs>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Step3;
