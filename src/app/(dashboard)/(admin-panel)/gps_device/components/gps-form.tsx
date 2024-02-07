import React from "react";
import { Col, Form, Input, Row, Select } from "antd";

function GpsForm({ rules }: any) {
  return (
    <>
      <Row gutter={[16, 16]}>
        {/* <Col xs={24} md={12}>
          <Form.Item
            rules={[rules]}
            name="code"
            label="کد"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col> */}
        <Col xs={24} md={12}>
          <Form.Item
                   rules={[rules]}

            name="name"
            label="نام"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
                 rules={[rules]}

            name="imei"
            label="imei"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        {/* <Col xs={24} md={12}>
          <Form.Item
                      rules={[rules]}
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
        </Col> */}
        <Col xs={24} md={12}>
          <Form.Item            rules={[rules]}
            name="capacity"
            label="ظرفیت"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item            rules={[rules]}
            name="stateUId"
            label="استان"
          >
            {/* <Select
              size="large"
              placeholder="انتخاب کنید"
              fieldNames={{ label: "Name", value: "Id" }}
              options={[]}
              // options={sortByIndex(data, 'Name')}
              loading={false}
            /> */}
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default GpsForm;
