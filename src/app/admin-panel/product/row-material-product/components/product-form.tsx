import React from "react";
import { Col, Form, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../../lib/filterOption";

function ProductForm() {
  const { data: Product, isLoading: ldProduct } = useSWR(
    [
      "/Product/GetAll",
      {
        name: null,
        IsActive: null,
      },
    ],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  const { data: Material, isLoading: ldMaterial } = useSWR(
    [
      "/Material/GetAll",
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
            name="productUid"
            label="نام محصول"
          >
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={ldProduct}
              options={Product}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="materialUid"
            label="نام ماده اولیه"
          >
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={ldMaterial}
              options={Material}
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
                { label: "غیرفعال", value: false },
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
