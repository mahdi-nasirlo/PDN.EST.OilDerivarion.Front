import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
import useSWR from "swr";
// import {listFetcher} from "@/lib/server/listFetcher";
import { sortByIndex } from "@/lib/sortByIndex";

function GpsForm() {

  // const { data, isLoading } = useSWR<any>(
  //   "/BaseInfo/StateGetAll", (url: string) => listFetcher(url));
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="code"
            label="کد"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="isActive"
            label="فعال/غیر فعال"
            initialValue={true}
          >
            <Select
              options={[
                { value: true, label: "فعال" },
                { value: false, label: "غیر فعال" },
              ]}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="capacity"
            label="ظرفیت"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
            name="stateId"
            label="استان"
          >
            <Select
              size="large"
              placeholder="انتخاب کنید"
              fieldNames={{ label: "Name", value: "Id" }}
              options={sortByIndex([], 'Name')}
            // loading={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default GpsForm;
