"use client";

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import CustomeDatePicker from "../../../../components/CustomeDatePicker";
import { filterOption } from "../../../../../lib/filterOption";
import { Card } from "@/components/card";

export default function SubmitForm() {
  const [form] = useForm();

  return (
    <Card>
      <Form layout="vertical" form={form}>
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item name="firstName" label="نام">
              <Input disabled size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="lastName" label="نام خانوادگی">
              <Input disabled size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item name="personNationalCode" label="کدملی">
              <Input
                disabled
                type="number"
                size="large"
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="companyName" label="نام شرکت">
              <Input disabled size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item name="companyNationalCode" label="شناسه ملی شرکت">
              <Input disabled size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="businessNumber"
              label="شناسه کسب و کار"
              rules={[
                { required: true, message: "لطفا مقدار را وارد کنید" },
                { pattern: /^\d{12}$/, message: "لطفاً 12 رقم وارد کنید" },
                { pattern: /^\d*$/, message: "لطفاً فقط عدد وارد کنید" },
              ]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="licenseTypeId"
              label="نوع مجوز"
              rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
            >
              <Select
                showSearch
                fieldNames={{ label: "Name", value: "Id" }}
                // @ts-ignore
                filterOption={filterOption}
                //   loading={ldLicense}
                //   options={sortByIndex(License, "Name")}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="licenseNumber"
              label="شماره مجوز"
              rules={[
                { required: true, message: "لطفا مقدار را وارد کنید" },
                {
                  pattern: /^(?!-)\d{12}(\.\d{12})?$/,
                  message: "شماره مجوز 12 رقمی است",
                },
              ]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="licenseValidityDatePersin"
              label="تاریخ اعتبار مجوز"
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            >
              <CustomeDatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="factoryStateId"
              label="استان"
              rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
            >
              <Select
                showSearch
                // @ts-ignore
                //   filterOption={filterOption}
                //   loading={states.isLoading}
                //   options={sortByIndex(states.data, "Name")}
                fieldNames={{ value: "Id", label: "Name" }}
                size="large"
                placeholder="انتخاب کنید"
                //   onChange={handleCentralOfficeProvinceChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="factoryCityId"
              label="شهرستان"
              rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
            >
              <Select
                showSearch
                // @ts-ignore
                filterOption={filterOption}
                // loading={ldCityGetAll}
                //   options={sortByIndex(cities.data, "Name")}
                fieldNames={{ value: "Id", label: "Name" }}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <Button size="large" type="primary" htmlType="submit">
            ارسال درخواست
          </Button>
        </div>
      </Form>
    </Card>
  );
}
