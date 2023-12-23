"use client";

import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";

export default function RequestsDetailsForm() {
  const [form] = useForm();

  return (
    <div>
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Form.Item name="lastName" label="نام واحد تولیدی">
              <Input size="large" placeholder="نام شرکت تولیدی تست" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
          فرآیند تولید
        </Typography>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Form.Item name="processDescription" label="شرح فرآیند تولید">
              <Input size="large" placeholder="متن تستی" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item name="lastName" label="شرح فرآیند تولید">
              <Input size="large" placeholder="متن تستی" disabled />
              <Button
                type="primary"
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 mx-1.5"
              >
                مشاهده نمودار
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
          تجهیزات آزمایشگاه
        </Typography>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="lastName" label="تجهیزات آزمایشگاه">
              <Input size="large" placeholder="780" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="lastName" label="کشور های مقصد صادرات">
              <Input size="large" placeholder="هیدروکربن سبک" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="lastName" label="محل فروش و یا دفن ضایعات">
              <Input size="large" placeholder="780" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="lastName" label="ضایعات">
              <Input size="large" placeholder="هیدروکربن سبک" disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
