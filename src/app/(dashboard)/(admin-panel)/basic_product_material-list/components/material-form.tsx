import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import useSWR from "swr";
import { useValidation } from "@/hooks/use-validation";
import { materialApi } from "constance/material";
import useBasicMaterial from "./hook/use-basic-material";
import MultipleSelect from "@/components/multiple-select";

function MaterialForm() {
  const [form, rules] = useValidation(
    materialApi.BasicProductMaterialCreate.type
  );
  const test = useBasicMaterial();
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
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              // filterOption={filterOption}
              // options={sortByIndex(Measure, "Name")}
              // loading={ldMeasure}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="testItems" label="فاکتور های آزمون">
            <MultipleSelect
              treeData={test.testItem.treeData}
              loading={test.testItem.isLoading}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default MaterialForm;
