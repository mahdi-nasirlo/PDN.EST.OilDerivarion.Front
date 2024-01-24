import { Col, Form, Input, Row } from "antd";
import React from "react";
import CustomDatePicker from "../../../../../../components/CustomeDatePicker";

export default function InformationForm() {
  return (
    <>
      <div className="box-border w-full p-6">
        <Form name="form_item_path" layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="Title" label="نام واحد تولیدی">
                <Input disabled size="large" placeholder="mysite" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="Title" label="تاریخ دریافت نمونه">
                <CustomDatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="lastName" label="تاریخ نمونه برداری">
                <CustomDatePicker />{" "}
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="IsActive" label="بارکد محرمانه">
                <Input disabled size="large" placeholder="mysite" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="lastName" label="تاریخ شروع آزمون">
                <CustomDatePicker />{" "}
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="IsActive" label="هزینه">
                <Input disabled size="large" placeholder="mysite" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}