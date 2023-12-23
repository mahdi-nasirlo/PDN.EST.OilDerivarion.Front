"use client";

import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import ButtonFilter from "../../../../../../components/ButtonFilter";
import { useForm } from "antd/es/form/Form";
import { useGetAllProductionMethod } from "../../../../../../hooks/baseInfo/useGetAllProductionMethod";

export default function FilterForm({
  filter,
  unsetFilter,
  isLoading,
}: {
  filter: (arg: any) => void;
  unsetFilter: () => void;
  isLoading: boolean;
}) {
  const [form] = useForm();
  const { isLoadingProductionMethods, productionMethods, fieldNames } =
    useGetAllProductionMethod();

  return (
    // <div className="box-border w-full mt-4 max-lg:mt-2 p-6">
    <Form onFinish={filter} form={form} layout="vertical">
      <Row gutter={[12, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="processDescription" label="شرح فرآیند">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="productionMethodId" label="روش تولید">
            <Select
              fieldNames={fieldNames}
              options={productionMethods}
              loading={isLoadingProductionMethods}
              placeholder="انتخاب کنید"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>
      <ButtonFilter unsetFilter={unsetFilter} isLoading={isLoading} />
    </Form>
    // </div>
  );
}
