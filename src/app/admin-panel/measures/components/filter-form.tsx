"use client";

import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import { ProductGet } from "../../../../../interfaces/product";

export default function FilterForm() {
  const [form] = useForm();

  return (
    // <div className="box-border w-full p-6">
    <Form form={form} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="name" label=" واحد اندازه گیری">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="measure_Id" label="فعال/غیرفعال">
            <Select
              defaultValue={"فعال"}
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
              // onClick={unsetFilter}
              htmlType="reset"
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
