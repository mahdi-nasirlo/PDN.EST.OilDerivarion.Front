import CustomDatePicker from "@/components/custome-date-picker";
import { Button, Col, Form, Row } from "antd";
import React from "react";

export default function TimeForm() {
  return (
    <Form layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item name={"start"} label="تاریخ شروع آزمایش">
            <CustomDatePicker />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name={"end"} label="تاریخ پایان آزمایش">
            <CustomDatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 10]} className="flex items-center justify-end">
        <Col xs={24} xxl={2} md={4} sm={6}>
          <Button
            className="w-full"
            size="large"
            type="primary"
            htmlType="submit"
          >
            ثبت
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
