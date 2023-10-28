"use client";

import { Button, Col, Form, Select, Row, Input } from "antd";
import React from "react";

export default function FilterForm({
  filter,
  unsetFilter,
}: {
  filter: (arg: LaboratoryGet) => void;
  unsetFilter: () => void;
}) {
  return (
    // <div className="box-border w-full p-6">
    <Form onFinish={filter} name="form_item_path" layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="Name" label="نام آزمایشگاه ">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        {/* <Col xs={24} md={12}>
          <Form.Item name="IsActive" label="فعال / غیر فعال">
            <Select
              options={[
                { value: true, label: "فعال" },
                { value: false, label: "غیر فعال" },
              ]}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col> */}
      </Row>
      <Row dir="ltr">
        <Col xs={10} md={3} lg={2}>
          <div className="flex gap-4">
            <Button
              className="btn-filter"
              size="large"
              type="primary"
              htmlType="submit"
            >
              اعمال فیلتر
            </Button>
            <Button
              className="btn-delete-filter"
              size="large"
              type="primary"
              htmlType="reset"
              onClick={unsetFilter}
            >
              حذف فیلتر
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
    // </div>
  );
}
