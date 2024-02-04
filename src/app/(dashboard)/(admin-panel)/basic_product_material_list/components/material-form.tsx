"use client";

import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { useMeasureList } from "@/hooks/basic/measure/use-measure-list";
import { TestItemsMultipeSelectField } from "@/components/fields/test-items-multiple-select-field";

function MaterialForm({ rules }: any) {
  const measure = useMeasureList();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item rules={[rules]} name="name" label="نام ماده اولیه">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="isActive"
            label="فعال / غیر فعال"
            rules={[rules]}
            initialValue={true}
          >
            <Select
              options={[
                { label: "فعال", value: true },
                { label: "غیر فعال", value: false },
              ]}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="measureUid" label="واحد اندازه گیری" rules={[rules]}>
            <Select
              showSearch
              fieldNames={measure.fieldNames}
              options={measure.data}
              loading={measure.isLoading}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="testItems" label="فاکتور های آزمون">
            <TestItemsMultipeSelectField />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default MaterialForm;
