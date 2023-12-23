"use client";

import { Col, Form, Input, Row } from "antd";
import React from "react";
import ButtonFilter from "../../../../../../components/ButtonFilter";

export default function FilterForm({ filter, unsetFilter, isLoading }: {
  filter: (arg: MaterialGet) => void,
  unsetFilter: () => void,
  isLoading: boolean;
}) {


  return (
    // <div className="box-border w-full p-6">
    <Form onFinish={filter} name="form_item_path" layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="name" label="نام محصول">
            <Input size="large"
              placeholder="انتخاب کنید" />
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
