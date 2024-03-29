"use client";

import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import ButtonFilter from "@/components/button-filter";
import { materialApi } from "constance/material";
import { z } from "zod";
import { useValidation } from "@/hooks/use-validation";
import measureApi from "constance/measure";

const dataFilter = measureApi.BasicMeasureGetPage.type;

export default function FilterForm({
  onFinish,
}: {
  onFinish: (arg: z.infer<typeof dataFilter>) => void;
}) {
  const [form, rules] = useValidation(dataFilter);

  return (
    <Form form={form} onFinish={(values) => onFinish(values)} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="name" label="واحد اندازه گیری">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="isActive" label="فعال / غیرفعال">
            <Select
              size="large"
              options={[
                { label: "فعال", value: true },
                { label: "غیرفعال", value: false },
              ]}
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <ButtonFilter
        unsetFilter={() => {
          form.submit();
          form.resetFields();
        }}
        isLoading={false}
      />
    </Form>
  );
}
