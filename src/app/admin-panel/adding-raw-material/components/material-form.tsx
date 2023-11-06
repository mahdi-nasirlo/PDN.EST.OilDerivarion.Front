import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import { filterOption } from "../../../../../lib/filterOption";

function MaterialForm() {
  const { data: Measure, isLoading: ldMeasure } = useSWR(
    "/Measure/GetAll",
    (url) => listFetcher(url, { arg: { name: null, IsActive: true } })
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true }]}
            name="Name"
            label="نام ماده اولیه"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="IsActive"
            label="وضعیت"
            rules={[{ required: true }]}
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
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="MeasureUid"
            label="واحد اندازه گیری"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              fieldNames={{ label: "Name", value: "Uid" }}
              // @ts-ignore
              filterOption={filterOption}
              options={Measure}
              loading={ldMeasure}
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
