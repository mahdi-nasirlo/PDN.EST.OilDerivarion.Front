import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../../lib/filterOption";

function ProductForm() {
  const { data: ProductCategory, isLoading: ldProductCategory } = useSWR(
    [
      "/ProductCategory/GetAll",
      {
        name: null,
        IsActive: null,
      },
    ],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  return (
    <>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="Name"
            label="نام محصول"
          >
            <Input
              // @ts-ignore
              size="large"
              placeholder="وارد کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="ProductCategoryUid"
            label="نام دسته بندی"
          >
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={ldProductCategory}
              options={ProductCategory}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="IsActive"
            label="فعال/غیر فعال"
          >
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
    </>
  );
}

export default ProductForm;
