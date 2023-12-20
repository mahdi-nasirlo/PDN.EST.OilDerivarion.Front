import React from "react";
import { Col, Form, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../../lib/filterOption";
import { sortByIndex } from "../../../../../../lib/sortByIndex";

function ProductForm() {
  const { data: Product, isLoading: ldProduct } = useSWR(
    "/Product/GetAll",
    (url: string) => listFetcher(url, { arg: { name: null, IsActive: true } })
  );

  const { data: Material, isLoading: ldMaterial } = useSWR(
    "/Material/GetAll",
    (url: string) => listFetcher(url, { arg: { name: null, IsActive: true } })
  );

  return (
    <>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true }]}
            name="productUid"
            label="نام محصول"
          >
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={ldProduct}
              options={sortByIndex(Product, 'Name')}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true }]}
            name="materialUid"
            label="نام ماده اولیه"
          >
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              filterOption={filterOption}
              loading={ldMaterial}
              options={sortByIndex(Material, "Name")}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="IsActive"
            label="فعال / غیر فعال"
            rules={[{ required: true }]}
            initialValue={true}
          >
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
    </>
  );
}

export default ProductForm;
