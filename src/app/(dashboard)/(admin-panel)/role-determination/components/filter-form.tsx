"use client";

import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import ButtonFilter from "@/components/button-filter";

export default function FilterForm() {

  const [form] = useForm();

  const onFinish = (values: any) => console.log(values);


  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} md={8}>
          <Form.Item name="lastName" label="نام">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item name="lastName" label="نام خانوادگی">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item name="NationalCode" label="شماره ملی">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <ButtonFilter
        unsetFilter={() => form.resetFields()}
        isLoading={false}
      />
    </Form>
  );
}
