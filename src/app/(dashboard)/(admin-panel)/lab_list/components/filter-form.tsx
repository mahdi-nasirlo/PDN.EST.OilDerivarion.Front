"use client";

import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import ButtonFilter from "@/components/button-filter";
import { materialApi } from "constance/material";
import { z } from "zod";
import { useValidation } from "@/hooks/use-validation";
import labApi from "constance/lab";
import useGetAllState from "@/hooks/basic/role_determination/state/use-get-all-state";
import { filterOption } from "@/lib/filterOption";

const dataFilter = labApi.LabGetPage.type;

export default function FilterForm({
  onFinish,
}: {
  onFinish: (arg: z.infer<typeof dataFilter>) => void;
}) {
  const [form, rules] = useValidation(dataFilter);
  const state = useGetAllState();

  return (
    <Form form={form} onFinish={(values) => onFinish(values)} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="name" label="نام آزمایشگاه">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="isActive" label="فعال / غیر فعال">
            <Select
              size="large"
              options={[
                { label: "فعال", value: true },
                { label: "غیر فعال", value: false },
              ]}
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <Form.Item rules={[rules]} name="stateUId" label="استان">
            <Select
              showSearch
              size="large"
              placeholder="انتخاب کنید"
              filterOption={filterOption}
              loading={state.isLoading}
              options={state.data}
              fieldNames={state.apiData.fieldNames}
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
