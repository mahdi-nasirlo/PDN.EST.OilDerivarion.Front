"use client";

import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import { ProductGet } from "../../../../../interfaces/product";
import ButtonFilter from "../../../../../components/ButtonFilter";

export default function FilterForm({
  filter,
  unsetFilter,
  isLoading
}: {
  filter: (arg: ProductGet) => void;
  unsetFilter: () => void;
  isLoading: boolean;
}) {
  const [form] = useForm();

  return (
    // <div className="box-border w-full p-6">
    <Form onFinish={(values) => filter(values)} form={form} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="name" label="نام فاکتور آزمون">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="IsActive" label="فعال/غیر فعال">
            <Select
              options={[
                { label: "فعال", value: true },
                { label: "غیر فعال", value: false },
              ]}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        {/* <Col xs={24} md={12}>
          <Form.Item name="measure_Id" label="واحد اندازه گیری">
            <Select disabled size="large" placeholder="انتخاب کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="testMethod" label="روش آزمون">
            <Input disabled size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col> */}
      </Row>
      <ButtonFilter
        unsetFilter={unsetFilter}
        isLoading={isLoading}
      />
    </Form>
    // </div>
  );
}
