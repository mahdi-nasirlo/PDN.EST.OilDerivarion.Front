import { Col, Form, Select } from "antd";
import React from "react";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import { filterOption } from "../../../../../lib/filterOption";

export default function TestItemSelect({ name }: { name: string }) {
  const { data, isLoading } = useSWR("/TestItem/GetAll", (url) =>
    listFetcher(url, {
      arg: {
        name: null,
        IsActive: true,
      },
    })
  );

  return (
    <Col xs={24} md={12}>
      <Form.Item
        name={name}
        label="فاکتور آزمون"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          // @ts-ignore
          filterOption={filterOption}
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
