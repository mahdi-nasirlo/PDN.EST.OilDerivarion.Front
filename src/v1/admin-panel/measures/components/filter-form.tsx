"use client";

import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import { MeasureGetPage } from "../../../../../interfaces/measures";
import ButtonFilter from "../../../../../components/ButtonFilter";

export default function FilterForm({
  filter,
  unsetFilter,
  isLoading
}: {
  filter: (arg: MeasureGetPage) => void;
  unsetFilter: () => void;
  isLoading: boolean;
}) {
  const [form] = useForm();

  return (
    // <div className="box-border w-full p-6">
    <Form onFinish={(values) => filter(values)} form={form} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="Name" label=" واحد اندازه گیری">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="IsActive" label="فعال/غیرفعال">
            <Select
              options={[
                { label: "فعال", value: true },
                { label: "غیرفعال", value: false },
              ]}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <ButtonFilter
        unsetFilter={unsetFilter}
        isLoading={isLoading}
      />
    </Form>
    // </div>
  );
}
