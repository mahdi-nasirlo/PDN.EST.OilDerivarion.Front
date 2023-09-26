"use client";

import {Button, Col, Form, Input, Row, Select} from "antd";
import React, {useState} from "react";

export default function FilterForm({filter, unsetFilter}: {
  filter: (arg: MaterialGet) => void,
  unsetFilter: () => void,
}) {
  const [selectedDensity, setSelectedDensity] = useState("");

  const handleDensityChange = (value: any) => {
    setSelectedDensity(value);
  };

  return (
      <div className="box-border w-full p-6 ">
        <Form onFinish={filter} name="form_item_path" layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]} name="name"
                         label="نام دسته بندی">
                <Input size="large" placeholder="انتخاب کنید"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="lastName" label="فعال/غیر فعال">
                <Select size="large" placeholder="انتخاب کنید"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="density" label="دانسیته">
                <Select
                    size="large"
                    placeholder="انتخاب کنید"
                    onChange={handleDensityChange}
                >
                  <Select.Option value="yes">دارد</Select.Option>
                <Select.Option value="no">ندارد</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="year" label="حداقل بازه">
              <Input size="large" placeholder="انتخاب کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item name="year" label="حداکثر بازه">
              <Input size="large" placeholder="انتخاب کنید" />
            </Form.Item>
          </Col>
        </Row>
        {selectedDensity === "yes" && (
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="top" label="حد بالا دانسیته">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="bottom" label="حد پایین دانسیته">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
        )}
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
    </div>
  );
}
