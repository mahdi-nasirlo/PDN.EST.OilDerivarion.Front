"use client";

import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { useMeasureList } from "@/hooks/basic/measure/use-measure-list";
import MultipleSelect from "@/components/multiple-select";
import { useTestItemList } from "@/hooks/basic/test_item/use-test-item-list";
import { filterOption } from "@/lib/filterOption";

function MaterialForm({ rules }: any) {
  const measure = useMeasureList();
  const testItem = useTestItemList();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="name" label="نام ماده اولیه">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="isActive"
            label="فعال / غیرفعال"
            rules={[rules]}
            initialValue={true}
          >
            <Select
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
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name="measureUid" label="واحد اندازه گیری" rules={[rules]}>
            <Select
              showSearch
              size="large"
              filterOption={filterOption}
              placeholder="انتخاب کنید"
              options={measure.data}
              loading={measure.isLoading}
              fieldNames={measure.fieldNames}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="testItems" label="فاکتورهای آزمون" rules={[rules]}>
            <MultipleSelect
              treeData={testItem.treeData}
              loading={testItem.isLoading}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default MaterialForm;
