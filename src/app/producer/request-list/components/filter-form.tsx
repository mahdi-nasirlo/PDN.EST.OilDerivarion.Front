"use client";

import { Button, Col, Form, Row, Select } from "antd";
import React from "react";
import CustomDatePicker from "../../../../../components/CustomeDatePicker";
import ButtonFilter from "../../../../../components/ButtonFilter";

export default function FilterForm({
  filter,
  unsetFilter,
  isLoading
}: {
  filter: (arg: MaterialGet) => void;
  unsetFilter: () => void;
  isLoading: boolean
}) {
  return (
    <>
      <Form name="form_item_path" layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="year" label="تاریخ درخواست">
              <CustomDatePicker/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="year-estale" label="وضعیت">
              <Select size="large" placeholder="انتخاب کنید" />
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
