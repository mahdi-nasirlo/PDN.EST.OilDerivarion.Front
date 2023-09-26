import { Col, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";

export default function EditForm() {
  const [selectedDensity, setSelectedDensity] = useState<boolean>(false);

  const handleDensityChange = (value: any) => {
    setSelectedDensity(value);
  };
  const { data, isLoading } = useSWR("/BaseInfo/GetAllTestMethod", listFetcher);
  return (
    <>
      <Row gutter={[32, 1]}>
        <Col xs={24} md={12}>
          <Form.Item name="name" label="نام دسته بندی">
            <Input size="large" placeholder="انتخاب کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="is_Active" label="فعال/غیر فعال">
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
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item name="testMethodId" label="روش تولید">
            <Select
              loading={isLoading}
              options={data}
              fieldNames={{ label: "Name", value: "Id" }}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="densityType" label="دانسیته">
            <Select
              options={[
                { label: "دارد", value: true },
                { label: "ندارد", value: false },
              ]}
              value={selectedDensity}
              onChange={(value) => setSelectedDensity(value)}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      {selectedDensity === true && (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="top" label="حد بالا دانسیته">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="bottom" label="حد پایین دانسیته">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  );
}
