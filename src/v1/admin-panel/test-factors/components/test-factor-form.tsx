import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { filterOption } from "../../../../../lib/filterOption";
import { sortByIndex } from "../../../../../lib/sortByIndex";

function TestFactorForm() {

  const defaultValue = { name: null, IsActive: true }

  const { data: Measure, isLoading: ldMeasure } = useSWR(
    ["/Measure/GetAll", defaultValue],
    ([url, arg]: [string, any]) => listFetcher(url, { arg })
  );


  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="نام فاکتور آزمون"
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="measureUid"
            label="واحد اندازه گیری"
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
          >
            <Select
              loading={ldMeasure}
              showSearch
              // @ts-ignore
              filterOption={filterOption}
              options={sortByIndex(Measure, "Name")}
              fieldNames={{ value: "Uid", label: "Name" }}
              size="large"
              placeholder="وارد کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="isActive"
            label="فعال/غیر فعال"
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
        <Col xs={24} md={12}>
          <Form.Item
            name="testDuration"
            label="مدت زمان انجام آزمایش (ساعت)"
            rules={[
              { required: true, message: "لطفا مقدار را وارد کنید" },
              {
                validator(_, value) {
                  const isInteger = Number.isInteger(parseFloat(value));
                  if (isNaN(value) || !isInteger || value < 0) {
                    const errorMessage = isInteger ? "لطفاً عدد مثبت وارد کنید" : "لطفاً عدد وارد کنید";
                    return Promise.reject(new Error(errorMessage));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default TestFactorForm;
