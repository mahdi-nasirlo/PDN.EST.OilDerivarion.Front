"use client";

import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { TestItem } from "../../../../../interfaces/TestItem";
import useSWR from "swr";

export default function FilterForm({
  isMutating,
  filter,
  unsetFilter,
}: {
  isMutating: any;
  filter: (arg: LaboratoryGet) => void;
  unsetFilter: () => void;
}) {
  const { data: test, isLoading } = useSWR<TestItem[]>(
    [
      "/TestItem/GetAll",
      {
        name: "",
        IsActive: null,
      },
    ],

    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  const defaultValueTable = {
    Name: "",
    IsActive: null,
    fromRecord: 0,
    selectRecord: 100000,
  };
  const { data: Lab, isLoading: ldProduct } = useSWR<{ records: Labratory[] }>(
    ["/Lab/GetPage", defaultValueTable],

    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  return (
    // <div className="box-border w-full p-6">
    <Form onFinish={filter} name="form_item_path" layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="labUid" label="نام آزمایشگاه">
            <Select
              fieldNames={{ label: "Name", value: "Uid" }}
              options={Lab?.records}
              loading={ldProduct}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="testItemUid" label="نام فاکتور">
            <Select
              fieldNames={{ label: "Name", value: "Uid" }}
              options={test}
              loading={isLoading || isMutating}
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
              htmlType="reset"
              onClick={() => unsetFilter()}
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
