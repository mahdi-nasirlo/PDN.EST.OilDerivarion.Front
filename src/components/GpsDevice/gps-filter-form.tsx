"use client";

import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import { Gps } from "./gps";
import ButtonFilter from "../../components/button-filter";

export default function GpsFilterForm({
  filter,
  unsetFilter,
  isLoading
}: {
  filter: (arg: Gps) => void;
  unsetFilter: () => void;
  isLoading: boolean;
}) {
  const [form] = useForm();

  return (
    <>
      {/* <div className="box-border w-full p-6"> */}
      <Form onFinish={filter} name="form_item_path" layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="Code" label="کد">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="IsActive" label="فعال / غیر فعال">
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
        <ButtonFilter
          unsetFilter={unsetFilter}
          isLoading={isLoading}
        />
      </Form>
      {/* </div > */}
    </>
  );
}
