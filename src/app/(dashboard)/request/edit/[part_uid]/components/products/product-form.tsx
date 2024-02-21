import React, { useState } from "react";
import { Form } from "antd/lib";
import PercentageInput from "@/components/inputs/percentage-input";
import { Rule } from "rc-field-form/es/interface";
import { Col, Row, Select } from "antd";
import useRequestPakagePartProductListDDl from "@/hooks/request-package/use-request-pakage-part-product-list-ddl";
import { filterOption } from "@/lib/filterOption";

interface TProps {
  rules: Rule;
  uid: string;
  package_uid?: string;
  form: any;
}
export default function ProductForm({ rules, uid, package_uid, form }: TProps) {

  const [density, setDensity] = useState<number>(0);

  const productListDDl = useRequestPakagePartProductListDDl({
    package_UID: package_uid,
    part_UID: uid,
    density: density,
  });

  return (
    <Row gutter={[16, 12]}>
      <Col xs={23} sm={12}>
        <Form.Item label="دانسیته" initialValue={0}>
          <Select
            size="large"
            options={[
              { value: 0, label: "دانسیته پایین 900" },
              { value: 1, label: "دانسیته بالای 900" },
            ]}
            value={density}
            onChange={(e) => {
              setDensity(e);
              form.setFieldsValue({ product_UID: undefined });
            }}
            placeholder="انتخاب نمایید"
            tokenSeparators={[","]}
          />
        </Form.Item>
      </Col>
      <Col xs={23} sm={12}>
        <Form.Item name="product_UID" label="محصول">
          <Select
            showSearch
            size="large"
            tokenSeparators={[","]}
            placeholder="انتخاب نمایید"
            filterOption={filterOption}
            options={productListDDl.options}
            loading={productListDDl.isFetching}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12}>
        <Form.Item name="estehsal" label="درصد استحصال" rules={[rules]}>
          <PercentageInput />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item name="hadarRaft" label="درصد هدر رفت" rules={[rules]}>
          <PercentageInput />
        </Form.Item>
      </Col>
    </Row>
  );
}
