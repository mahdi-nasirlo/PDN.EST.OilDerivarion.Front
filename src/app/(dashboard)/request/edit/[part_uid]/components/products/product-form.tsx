import React, { useState } from "react";
import { Form } from "antd/lib";
import { Rule } from "rc-field-form/es/interface";
import { Col, FormInstance, InputNumber, Row, Select } from "antd";
import useRequestPakagePartProductListDDl from "@/hooks/request-package/use-request-pakage-part-product-list-ddl";
import { filterOption } from "@/lib/filterOption";

interface TProps {
  rules: Rule;
  uid: string;
  package_uid?: string;
  form: FormInstance;
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
        <Form.Item label="دانسیته" initialValue={0} rules={[rules]}>
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
        <Form.Item name="product_UID" label="محصول" rules={[rules]}>
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
        <Form.Item
          required={false}
          name="estehsal"
          label="درصد استحصال"
          rules={[
            { required: true, message: "مقدار تعریف نشده است" },
            {
              validator: (_, value) => {
                const isInteger = Number.parseFloat(value);
                if ((value == undefined) || !isInteger || (value < 0)) {
                  const errorMessage = isInteger
                    ? "لطفا عدد مثبت وارد کنید"
                    : (value == 0)
                      ? "درصد استحصال نمی تواند صفر باشد"
                      : "لطفا عدد وارد کنید";
                  return Promise.reject(new Error(errorMessage));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            controls={false}
            max={100}
            className="w-full"
            size="large"
            formatter={(value) => `${value}%`}
            placeholder='وارد کنید'
          />

        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item
          required={false}
          name="hadarRaft"
          label="درصد هدر رفت"
          rules={[
            { required: true, message: "مقدار تعریف نشده است" },
            ({ getFieldValue }) => ({
              validator: (_, value) => {
                const estehsalFieldValue = getFieldValue("estehsal");
                if (typeof estehsalFieldValue === 'number' && !isNaN(estehsalFieldValue)) {
                  const isInteger2 = Number.isFinite(value)
                  if (isNaN(value) || !isInteger2 || (value < 0)) {
                    const errorMessage = isInteger2
                      ? "لطفا عدد مثبت وارد کنید"
                      : "لطفا عدد وارد کنید";
                    return Promise.reject(new Error(errorMessage));
                  }
                  const sum = parseFloat(value) + estehsalFieldValue
                  if (sum < 100 || sum > 100) {
                    return Promise.reject(new Error("جمع درصد استحصال و درصد هدر رفت باید 100 باشد"));
                  } else {
                    return Promise.resolve();
                  }
                }
              },
            }),
          ]}
        >
          <InputNumber
            controls={false}
            max={100}
            className="w-full"
            size="large"
            formatter={(value) => `${value}%`}
            placeholder='وارد کنید'
          />
        </Form.Item>
      </Col>
    </Row >
  );
}
