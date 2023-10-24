"use client";

import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useForm } from "antd/lib/form/Form";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";

export default function FilterForm({
  filter,
  unsetFilter,
}: {
  filter: (arg: MaterialGet) => void;
  unsetFilter: () => void;
}) {
  const [form] = useForm();

  const resetForm = () => {
    unsetFilter();

    form.resetFields;
  };

  // const { data: MaterialTestItem, isLoading: ldMaterialTestItem } = useSWR("/MaterialTestItem/GetAll", (url) =>
  //   listFetcher(url, { arg: { name: null, IsActive: null, }, })
  // );

  const { data: Measure, isLoading: ldMeasure } = useSWR(
    "/Measure/GetAll",
    (url) => listFetcher(url, { arg: { name: null, IsActive: null } })
  );

  return (
    // <div className="box-border w-full p-6">
    <Form onFinish={filter} name="form_item_path" layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="name" label="نام ماده اولیه">
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="IsActive" label="فعال / غیر فعال">
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
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="MeasureUid" label="واحد اندازه گیری">
            <Select
              options={Measure}
              loading={ldMeasure}
              fieldNames={{ value: "Uid", label: "Name" }}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        {/* <Col xs={24} md={12}>
          <Form.Item name="TestItems" label="فاکتور آزمون ">
            <Select
              options={MaterialTestItem}
              loading={ldMaterialTestItem}
              fieldNames={{ value: "TestItemUid", label: "TestItemName" }}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col> */}
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
              onClick={resetForm}
              className="btn-delete-filter"
              size="large"
              type="primary"
              htmlType="reset"
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
