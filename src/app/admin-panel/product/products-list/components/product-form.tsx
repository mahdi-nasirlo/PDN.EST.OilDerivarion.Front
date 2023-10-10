import React from "react";
import { Col, Form, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../../lib/filterOption";

function ProductForm() {
  const { data: products, isLoading: ldProducts } = useSWR(
    [
      "/Product/GetAll",
      {
        name: null,
        is_Active: null,
      },
    ],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  const { data: material, isLoading: ldMaterial } = useSWR(
    [
      "/Material/GetAll",
      {
        name: null,
        is_Active: null,
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
            name="productUid"
            label="نام محصول"
          >
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={ldProducts}
              options={products}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="materialUid"
            label="مواد اولیه"
          >
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={ldMaterial}
              options={material}
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
