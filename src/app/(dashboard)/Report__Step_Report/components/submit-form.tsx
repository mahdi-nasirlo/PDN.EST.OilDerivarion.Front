"use client";

import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { filterOption } from "../../../../../lib/filterOption";
import { useValidation } from "@/hooks/useValidation";
import { ssoApi } from "constance/auth";
import TransferList from "./transfer";
import useGetStep from "@/hooks/basic/use-basic";

export default function SubmitForm() {
  const [form, rules] = useValidation(ssoApi.test.type);
  const steps = useGetStep();

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Form.Item
            name="factoryStateId"
            label="استان"
            required={false}
            rules={[rules]}
            // rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
          >
            <Select
              showSearch
              // @ts-ignore
              loading={steps.isLoading}
              options={steps.data}
              fieldNames={{ value: "Id", label: "Name" }}
              size="large"
              placeholder="انتخاب کنید"
              //   onChange={handleCentralOfficeProvinceChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Form.Item
            required={false}
            rules={[rules]}
            // rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
          >
            <div className="flex justify-center mt-8">
              <TransferList />
            </div>
          </Form.Item>
        </Col>
      </Row>
      <div className="flex justify-end">
        <Button size="large" type="primary" htmlType="submit">
          ثبت نهایی
        </Button>
      </div>
    </Form>
  );
}