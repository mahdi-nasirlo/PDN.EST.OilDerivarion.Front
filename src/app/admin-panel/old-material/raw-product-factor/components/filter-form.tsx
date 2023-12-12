"use client";

import { Col, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import ButtonFilter from "../../../../../components/ButtonFilter";

export default function FilterForm({
  filter,
  unsetFilter,
  isLoading
}: {
  filter: (arg: MaterialGet) => void;
  unsetFilter: () => void;
  isLoading: boolean;
}) {

  const [form] = useForm();

  return (
    // <div className="box-border w-full p-6">
    <Form onFinish={filter} form={form} layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="Name"
            label="نام ماده اولیه"
          >
            <Input size="large" placeholder="انتخاب کنید" />
          </Form.Item>
        </Col>
        {/* <Col xs={24} md={12}>
          <Form.Item
            name="IsActive"
            label="فعال / غیر فعال"
          >
            <Select
              options={[
                { label: "فعال", value: true },
                { label: "غیر فعال", value: false },
              ]}
              size="large"
              placeholder="انتخاب کنید"
            />
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
