"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import { useValidation } from "@/hooks/use-validation";
import measureApi from "constance/measure";
import { z } from "zod";
import useMeasureCreate from "@/hooks/basic/measure/use-measure-create";

export default function FormReult() {
  return (
    <Form layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            // rules={[rules]}
            name="name"
            label="محدوده"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="isActive"
            label="توضیحات"
            //   rules={[rules]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            // rules={[rules]}
            name="name"
            label="حداقل مقدار قابل قبول"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="isActive"
            label="حداقل مقدار قابل قبول"
            //   rules={[rules]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            // rules={[rules]}
            name="name"
            label="تجدید پذیری"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="isActive"
            label="استاندارد های فاکتور آزمون"
            //   rules={[rules]}
          >
            <Select size="large" placeholder="انتخاب کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            // rules={[rules]}
            name="name"
            label="واحد اندازه گیری"
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="isActive"
            label="فعال / غیر فعال"
            //   rules={[rules]}
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
    </Form>
  );
}
