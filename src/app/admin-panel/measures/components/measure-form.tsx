import React from "react";
import {Col, Form, Input, Row, Select} from "antd";

function MeasureForm() {
  return (
    <>
      <Row gutter={[32, 1]}>
          <Col xs={24} md={12}>
              <Form.Item
                  name="name"
                  label="واحد اندازه گیری"
                  rules={[{required: true}]}
              >
                  <Input size="large" placeholder="وارد کنید"/>
              </Form.Item>
          </Col>
          <Col xs={24} md={12}>
              <Form.Item name="isActive" label="فعال/غیرفعال" rules={[{required: true}]}>
                  <Select
                      options={[
                          {label: "فعال", value: true},
                          {label: "غیرفعال", value: false},
                      ]}
                      size="large"
                      placeholder="انتخاب کنید"
                  />
              </Form.Item>
          </Col>
      </Row>
    </>
  );
}

export default MeasureForm;
