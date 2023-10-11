import React from "react";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";

function MeasureForm() {
  const { data: Measure, isLoading: ldMeasure } = useSWR(
    [
      "/Measure/GetAll",
      {
        name: null,
        isActive: null,
      },
    ],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );

  return (
    <>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="نام فاکتور"
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="isActive" label="فعال/غیرفعال">
            <Select
              defaultValue={"فعال"}
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

export default MeasureForm;
