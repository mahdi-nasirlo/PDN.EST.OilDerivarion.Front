import { Button, Col, Form, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { filterOption } from "../../../../../lib/filterOption";

export default function FilterForm({
  TestResult,
  filter,
  unsetFilter,
}: {
  TestResult: any;
  filter: (arg: any) => void;
  unsetFilter: () => void;
}) {
  const [form] = useForm();

  return (
    // <div className="box-border w-full p-6">
    <Form onFinish={filter} name="form_item_path" layout="vertical" form={form}>
      <Row gutter={[16, 16]}>
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
            />{" "}
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
            />{" "}
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
              onClick={unsetFilter}
              className="btn-delete-filter"
              size="large"
              type="primary"
              htmlType="submit"
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
