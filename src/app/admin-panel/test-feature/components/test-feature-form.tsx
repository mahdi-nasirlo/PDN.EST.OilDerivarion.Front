import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import TestItemSelect from "./test-item-select";

export default function TestFeatureForm() {
  return (
    <>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="title" label="عنوان فاکتور">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <TestItemSelect name={"testItemUid"} />
      </Row>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="referenceCode" label="مرجع">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="isActive" label="فعال / غیر فعال">
            <Select
              size="large"
              options={[
                { label: "فعال", value: true },
                { label: "غیر فعال", value: false },
              ]}
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
