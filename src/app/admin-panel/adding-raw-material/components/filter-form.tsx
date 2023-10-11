"use client";

import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useForm } from "antd/lib/form/Form";

export default function FilterForm({ filter, unsetFilter }: {
  filter: (arg: MaterialGet) => void,
  unsetFilter: () => void,
}) {

  const [form] = useForm()

  const resetForm = () => {

    unsetFilter()

    form.resetFields
  }

  return (
    // <div className="box-border w-full p-6">
    <Form form={form} name="form_item_path" layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="name" label="نام ماده اولیه">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="year-establishment" label="واحد اندازه گیری">
            <Select size="large" placeholder="انتخاب کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="is_Active" label="فعال / غیر فعال">
            <Select
              size="large"
              defaultValue={true}
              options={[
                { label: "فعال", value: true },
                { label: "غیر فعال", value: false },
              ]}
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="year-establishment" label="کد ماده">
            <Select size="large" placeholder="انتخاب کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="factore" label="فاکتور آزمون ">
            <Select size="large" placeholder="انتخاب کنید" />
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
              onClick={resetForm}
              className="btn-delete-filter"
              size="large"
              type="primary"
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
