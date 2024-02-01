import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import useSWR from "swr";
import { useValidation } from "@/hooks/use-validation";
import { materialApi } from "constance/material";
import useBasicMaterial from "./hook/use-basic-material";
import MultipleSelect from "@/components/multiple-select";

function MaterialForm({ rules }: { rules: any }) {
  const { testItem, measure } = useBasicMaterial();
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
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
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
              // @ts-ignore
              // filterOption={filterOption}
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
