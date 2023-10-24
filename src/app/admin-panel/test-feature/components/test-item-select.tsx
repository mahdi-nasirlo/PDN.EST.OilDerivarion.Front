import { Col, Form, Select } from "antd";
import React from "react";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";

export default function TestItemSelect({ name }: { name: string }) {
  const { data, isLoading } = useSWR("/TestItem/GetAll", (url) =>
    listFetcher(url, {
      arg: {
        name: null,
        IsActive: null,
      },
    })
  );

  return (
    <Col xs={24} md={12}>
      <Form.Item name={name} label="عنوان استاندارد">
        <Select
          options={data}
          loading={isLoading}
          fieldNames={{ value: "Uid", label: "Name" }}
          size="large"
          placeholder="وارد کنید"
        />
      </Form.Item>
    </Col>
  );
}
