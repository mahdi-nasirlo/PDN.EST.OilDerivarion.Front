import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { useProductCategoryList } from "@/hooks/basic/product-category/use-product-category-list";
import { useMaterialGetAll } from "@/hooks/material/use-material-get-all";
import { useTestItemList } from "@/hooks/basic/test_item/use-test-item-list";
import MultipleSelect from "@/components/multiple-select";
import { filterOption } from "@/lib/filterOption";

function ProductForm({ rules }: any) {

  const productCategory = useProductCategoryList()

  const materials = useMaterialGetAll()

  const testItems = useTestItemList()


  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            rules={[rules]}
            name="name"
            label="نام محصول"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            rules={[rules]}
            name="productCategoryUid"
            label="نام دسته بندی"
          >
            <Select
              showSearch
              size="large"
              placeholder="انتخاب کنید"
              filterOption={filterOption}
              loading={productCategory.isLoading}
              options={productCategory.options}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="materials"
            label="مواد اولیه"
            rules={[rules]}
          >
            <MultipleSelect
              treeData={materials.data?.map((item: any) => ({ value: item.uid, label: item.name }))}
              loading={materials.isLoading}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="فاکتورهای آزمون"
            name="testItems"
            rules={[rules]}
          >
            <MultipleSelect
              treeData={testItems.data?.map((item: any) => ({ value: item.uid, label: item.name }))}
              loading={testItems.isLoading}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            rules={[rules]}
            name="isActive"
            label="فعال/غیرفعال"
            initialValue={true}
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
