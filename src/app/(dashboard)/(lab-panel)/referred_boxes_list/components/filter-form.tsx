import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import ButtonFilter from "@/components/button-filter";

export default function FilterForm({ onFinish }: { onFinish: (arg: any) => void; }) {

  return (
    <Form onFinish={(values) => onFinish(values)} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <Form.Item name="name" label="نام جعبه">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="isActive" label="وضعیت">
            <Select
              size="large"
              options={[
                { label: "باز نشده", value: 0 },
                { label: "درحال بررسی", value: 1 },
                { label: "ثبت شده", value: 2 },
              ]}
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <ButtonFilter
        unsetFilter={(values: any) => {
          console.log(values);
        }}
        isLoading={false}
      />
    </Form>
  );
}
