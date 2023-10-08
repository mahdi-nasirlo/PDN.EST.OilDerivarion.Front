"use client";

import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";
import { ProductGet } from "../../../../../interfaces/product";

export default function FilterForm({ filter, unsetFilter }: {
  filter: (arg: ProductGet) => void,
  unsetFilter: () => void,
}) {

  const [hasDensityLimit, setHasDensityLimit] = useState(false);

  return (
    // <div className="box-border w-full p-6 ">
    <Form onFinish={filter} name="form_item_path" layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="name" label="نام دسته بندی">
            <Input size="large" placeholder="انتخاب کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="is_Active" label="فعال/غیر فعال">
            <Select
              size="large"
              placeholder="انتخاب کنید"
              options={[
                { label: "فعال", value: true },
                { label: "غیرفعال", value: false },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="HasDensity" label="دانسیته">
            <Select
              disabled
              size="large"
              placeholder="انتخاب کنید"
              options={[
                { label: "دارد", value: true },
                { label: "ندارد", value: false },
              ]}
              onChange={(value) => setHasDensityLimit(value)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item name="densityLowerLimit" label="حداقل بازه" >
            <Input size="large" placeholder="انتخاب کنید" disabled={!hasDensityLimit} />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item name="densityUpperLimit" label="حداکثر بازه">
            <Input size="large" placeholder="انتخاب کنید" disabled={!hasDensityLimit} />
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
              onClick={unsetFilter}
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
