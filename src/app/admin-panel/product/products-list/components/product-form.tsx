import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../../lib/filterOption";
import MultipleSelect from '../../../../../../components/MultipleSelect';

function ProductForm() {
  const defaultValue = { name: null, IsActive: true }

  const { data: Material, isLoading: ldMaterial } = useSWR(
    ["/Material/GetAll", defaultValue],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  const { data: TestItem, isLoading: ldTestItem } = useSWR<any[]>(
    ["/TestItem/GetAll", defaultValue],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  const { data: ProductCategory, isLoading: ldProductCategory } = useSWR(
    ["/ProductCategory/GetAll", defaultValue],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  return (
    <>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="name"
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
            name="productCategoryUid"
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
            name="materials"
            label="مواد اولیه"
          >
            <MultipleSelect
              treeData={Material?.map((item: any) => ({ value: item.uid, label: item.name })) || []}
              loading={ldMaterial}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="فاکتور های آزمون"
            name="testItems"
          >
            <MultipleSelect
              treeData={TestItem?.map(item => ({ value: item.Uid, label: item.Name })) || []}
              loading={ldTestItem}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[32, 1]}>  <Col xs={24} md={12}>
        <Form.Item
          rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
          name="isActive"
          label="فعال/غیر فعال"
          initialValue={true}
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
