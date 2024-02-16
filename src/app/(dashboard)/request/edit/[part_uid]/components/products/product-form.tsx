import React from "react";
import { Form } from "antd/lib";
import PercentageInput from "@/components/inputs/percentage-input";
import { Rule } from "rc-field-form/es/interface";
import { Col, Row } from "antd";
import { ProductSelectField } from "@/components/fields/product-select-field";
import useUiRequestPackageProductCreate from "../../hook/use-ui-request-package-product-create";

interface TProps {
  rules: Rule;
  uid: string;
  package_uid?: string;
  visibleModal?: boolean;
  setVisibleModal?: (arg: any) => void;
}
export default function ProductForm({
  rules,
  uid,
  package_uid,
  visibleModal,
  setVisibleModal,
}: TProps) {
  const { onFinish, addProduct, requestInfo, form, onClose } =
    useUiRequestPackageProductCreate({
      uid,
      visibleModal,
      setVisibleModal,
      package_uid,
    });

  return (
    <Row gutter={[16, 12]}>
      <Col xs={23} sm={12}>
        <Form.Item name="product_UID" label="محصول">
          <ProductSelectField />
        </Form.Item>
      </Col>
      <Col xs={23} sm={12}>
        <Form.Item name="hadarRaft" label="درصد هدر رفت" rules={[rules]}>
          <PercentageInput />
        </Form.Item>
      </Col>
      <Col xs={23} sm={12}>
        <Form.Item name="estehsal" label="درصد استحصال" rules={[rules]}>
          <PercentageInput />
        </Form.Item>
      </Col>
    </Row>
  );
}
