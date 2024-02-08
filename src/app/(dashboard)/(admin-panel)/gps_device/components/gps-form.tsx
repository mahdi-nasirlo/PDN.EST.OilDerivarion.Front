import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { StateSelectField } from "@/components/fields/state-select-field";
import { InputNumber } from "antd/lib";

function GpsForm({ rules }: any) {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="code" label="کد جعبه">
            <InputNumber
              className="w-full"
              size="large"
              placeholder="وارد کنید"
              type="number"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="name" label="نام">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="imei" label="imei">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            rules={[rules]}
            name="isActive"
            label="فعال/غیر فعال"
            initialValue={true}
          >
            <Select
              options={[
                { value: true, label: "فعال" },
                { value: false, label: "غیر فعال" },
              ]}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="capacity" label="ظرفیت">
            <InputNumber
              className="w-full"
              size="large"
              placeholder="وارد کنید"
              type="number"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="stateUId" label="استان">
            <StateSelectField />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default GpsForm;
