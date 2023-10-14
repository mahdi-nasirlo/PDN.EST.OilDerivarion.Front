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
import DataTable from "../../request-detail/components/data-table";

export default function LaboratoryEquipmentsForm() {
  return (
    <>
      {/* <div className="box-border w-full p-6"> */}
      <Typography className="flex text-secondary-500 mb-6 font-medium">
        تجهیزات آزمایشگاه
      </Typography>
      <Form name="form_item_path" layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="year-establishment" label="تجهیزات آزمایشگاه">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="lastName" label="کشور های مقصد صادرات">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="year-estale" label="محل فروش و یا دفن ضایعات">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="year" label="ضایعات">
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
      <DataTable />
      {/* </div> */}
    </>
  );
}
