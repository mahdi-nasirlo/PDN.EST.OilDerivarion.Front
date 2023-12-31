import React from "react";
import { Col, Form, FormInstance, Input, Row } from "antd";
import ContactInputs from "../../../../../../../components/inputs/Contact";

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
        <Row gutter={[16, 16]}>
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
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              rules={[
                { required: true },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "شماره ملی نامتعبر است",
                },
              ]}
              name="responsibleNationalCode"
              label="شماره ملی"
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <ContactInputs label="شماره موبایل" name="responsibleMobile">
              <Input size="large" placeholder="وارد کنید" />
            </ContactInputs>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Step2;
