"use client";

import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { ProductGet } from "../../../../../../interfaces/product";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../../lib/filterOption";
import ButtonFilter from "../../../../../../components/ButtonFilter";
import { sortByIndex } from "../../../../../../lib/sortByIndex";

export default function FilterForm({
  filter,
  unsetFilter,
  isLoading
}: {
  filter: (arg: ProductGet) => void;
  unsetFilter: () => void;
  isLoading: boolean;
}) {
  const { data: GetAllDensityType, isLoading: ldGetAllDensityType } = useSWR(
    ["/BaseInfo/GetAllDensityType", { name: null, IsActive: true }],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );
  return (
    // <div className="box-border w-full p-6 ">
    <Form onFinish={filter} name="form_item_path" layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="name" label="نام دسته بندی">
            <Input size="large" placeholder="انتخاب کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="isActive" label="فعال/غیر فعال">
            <Select
              size="large"
              placeholder="انتخاب کنید"
              options={[
                { label: "فعال", value: true },
                { label: "غیرفعال", value: false },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="densityTypeId" label="دانسیته">
            <Select
              showSearch
              // @ts-ignore
              filterOption={filterOption}
              loading={ldGetAllDensityType}
              options={sortByIndex(GetAllDensityType, "Name")}
              fieldNames={{ value: "Id", label: "Name" }}
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
