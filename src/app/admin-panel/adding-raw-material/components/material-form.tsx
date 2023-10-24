import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";

function MaterialForm() {
  const { data: Measure, isLoading: ldMeasure } = useSWR(
    "/Measure/GetAll",
    (url) => listFetcher(url, { arg: { name: null, IsActive: null } })
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[
              { required: true, message: "لطفا نام مواد اولیه را وارد کنید" },
            ]}
            name="Name"
            label="نام ماده اولیه"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="IsActive" label="وضعیت">
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
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="MeasureUid" label="واحد اندازه گیری">
            <Select
              options={Measure}
              loading={ldMeasure}
              fieldNames={{ value: "Uid", label: "Name" }}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default MaterialForm;
