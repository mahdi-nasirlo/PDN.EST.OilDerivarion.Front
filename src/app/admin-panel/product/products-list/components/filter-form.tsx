"use client";

import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useForm } from "antd/lib/form/Form";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { ProductCategoryGet } from "../../../../../../interfaces/product";
import { filterOption } from "../../../../../../lib/filterOption";
import ButtonFilter from "../../../../../../components/ButtonFilter";
import { sortByIndex } from "../../../../../../lib/sortByIndex";

export default function FilterForm({
  filter,
  unsetFilter,
  isLoading
}: {
  filter: (arg: ProductCategoryGet) => void;
  unsetFilter: () => void;
  isLoading: boolean
}) {
  const [form] = useForm();

  const { data: ProductCategory, isLoading: ldProductCategory } = useSWR(
    ["/ProductCategory/GetAll", { name: null, IsActive: true }],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  return (
    // <div className="box-border w-full p-6">
    <Form form={form} onFinish={filter} name="form_item_path" layout="vertical">
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="name" label="نام محصول">
            <Input
              // @ts-ignore
              size="large"
              placeholder="وارد کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="productCategoryUid" label="نام دسته بندی">
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={ldProductCategory}
              options={sortByIndex(ProductCategory, "Name")}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="isActive" label="فعال/غیر فعال">
            <Select
              options={[
                { label: "فعال", value: true },
                { label: "غیر فعال", value: false },
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
    // </div >
  );
}
