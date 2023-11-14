"use client";

import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { Typography } from "antd/lib";
import React from "react";
import LaboratoryEquipmentsForm from "./laboratory-equipments-form";

export default function ProductionProcessForm() {
  return (
    <>
      <div className="box-border w-full p-6">
        <Typography className="flex">
          لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را تایید
          نمایید.
        </Typography>
        <Divider />
        <Form name="form_item_path" layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item name="year-establishment" label="نام واحد تولیدی">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Typography className="flex text-secondary-500 mb-6 font-medium">
            فرآیند تولید
          </Typography>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item name="year-estale" label="شرح فرآیند تولید">
                <Input size="large" placeholder="وارد کنید" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Form.Item name="lastName" label="شرح فرآیند تولید">
                <Input size="large" placeholder="متن تستی" />
                <Button
                  type="primary"
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 mx-1.5"
                >
                  مشاهده نمودار
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Divider />
        <LaboratoryEquipmentsForm />
      </div>
    </>
  );
}
