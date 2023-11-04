"use client";

import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import useSWR from "swr";
import { filterOption } from "../../../../../../lib/filterOption";
import { useForm } from "antd/es/form/Form";
import test from "node:test";

export default function FilterForm({
  filter,
  unsetFilter,
}: {
  filter: (arg: any) => void;
  unsetFilter: () => void;
}) {
  const { data, isLoading } = useSWR("/BaseInfo/UserTypeGetAll", listFetcher);

  const [form] = useForm();

  const CancelFilter = () => {
    unsetFilter();
    form.resetFields();
  };
  return (
    // <div className="box-border w-full p-6">
    <Form name="form_item_path" form={form} onFinish={filter} layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="lastName" label="نام خانوادگی">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="NationalCode"
            label="کد ملی"
            rules={[
              { required: true },
              {
                pattern: /^[0-9]{10}$/,
                message: "کد ملی نامتعبر است",
              },
            ]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="userTypeId" label="نوع کاربر">
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Id" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={isLoading}
              options={data}
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
              className="btn-delete-filter"
              size="large"
              type="primary"
              htmlType="submit"
              onClick={CancelFilter}
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
