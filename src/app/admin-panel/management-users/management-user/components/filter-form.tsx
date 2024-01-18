"use client";

import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import useSWR from "swr";
import { filterOption } from "../../../../../../lib/filterOption";
import { useForm } from "antd/es/form/Form";
import ButtonFilter from "../../../../../../components/ButtonFilter";

export default function FilterForm({
  filter,
  unsetFilter,
  isLoading
}: {
  filter: (arg: any) => void;
  unsetFilter: () => void;
  isLoading: boolean;
}) {
  const { data: dataUserType, isLoading: ldUserType } = useSWR("/BaseInfo/UserTypeGetAll", listFetcher);

  const [form] = useForm();

  return (
    // <div className="box-border w-full p-6">
    <Form name="form_item_path" form={form} onFinish={filter} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="lastName" label="نام خانوادگی">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="NationalCode"
            label="شماره ملی"
            rules={[
              {
                pattern: /^(?!(\d)\1{9})\d{10}$/,
                message: "شماره ملی نامعتبر است",
              },
            ]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="userTypeId" label="نوع کاربر">
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Id" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={ldUserType}
              options={dataUserType}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="IsActive" label="فعال / غیر فعال">
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
      <ButtonFilter
        unsetFilter={unsetFilter}
        isLoading={isLoading}
      />
    </Form>
    // </div>
  );
}
