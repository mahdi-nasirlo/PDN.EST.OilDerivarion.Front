"use client";

import { Col, Form, Row, Select } from "antd";
import React from "react";
import CustomDatePicker from "../../../../../components/CustomeDatePicker";
import ButtonFilter from "../../../../../components/ButtonFilter";
import { useForm } from "antd/es/form/Form";

export default function FilterForm({
  filter,
  unsetFilter,
  isLoading
}: {
  filter: (arg: any) => void;
  unsetFilter: () => void;
  isLoading: boolean
}) {

  const [form] = useForm();

  return (
    <>
      <Form onFinish={filter} form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="year" label="تاریخ درخواست">
              <CustomDatePicker/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="labIsAccepted" label="وضعیت">
              <Select
                size="large"
                placeholder="انتخاب کنید"
                options={[
                  { label: "بررسی شده", value: true },
                  { label: "بررسی نشده", value: false },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <ButtonFilter
          unsetFilter={unsetFilter}
          isLoading={isLoading}
        />
      </Form>
    </>
  );
}
