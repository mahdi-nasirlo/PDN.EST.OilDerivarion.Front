import { Col, Form, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { filterOption } from "../../../../../lib/filterOption";
import ButtonFilter from "../../../../../components/ButtonFilter";

export default function FilterForm({
  TestResult,
  filter,
  unsetFilter,
  isLoading
}: {
  TestResult: any;
  filter: (arg: any) => void;
  unsetFilter: () => void;
  isLoading: boolean;
}) {
  const [form] = useForm();

  return (
    // <div className="box-border w-full p-6">
    <Form onFinish={filter} name="form_item_path" layout="vertical" form={form}>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="labUid" label="نام آزمایشگاه">
            <Select
              showSearch
              fieldNames={{ label: "LabName", value: "LabUid" }}
              // @ts-ignore
              filterOption={filterOption}
              options={TestResult}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="requestBarcodeUid" label="بارکد">
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "RequestBarcodeUid" }}
              // @ts-ignore
              filterOption={filterOption}
              options={TestResult}
              size="large"
              placeholder="انتخاب کنید"
            />
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
