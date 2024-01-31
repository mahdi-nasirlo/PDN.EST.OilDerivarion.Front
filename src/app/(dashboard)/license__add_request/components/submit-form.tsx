"use client";

import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect } from "react";
import CustomeDatePicker from "../../../../components/custome-date-picker";
import { filterOption } from "../../../../../lib/filterOption";
import { useValidation } from "@/hooks/use-validation";
import { ssoApi } from "constance/auth";
import useProducerInfo from "./hook/use-producer-info";
import licenseApi from "constance/license";

export default function SubmitForm() {
  const { producerInfo, License, addLicense, state } = useProducerInfo();

  const [form, rules] = useValidation(licenseApi.AddRequest.type);
  useEffect(() => {
    if (producerInfo.data) {
      form.setFieldsValue(producerInfo.data);
    }
  }, [producerInfo.data]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={(data) => addLicense.mutateAsync(data)}
    >
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="representative__Name" label="نام">
            <Input disabled size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="representative__Family" label="نام خانوادگی">
            <Input disabled size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="representative__National_ID" label="کدملی">
            <Input
              disabled
              type="number"
              size="large"
              placeholder="وارد کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="company__Name" label="نام شرکت">
            <Input disabled size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item name="company__National_ID" label="شناسه ملی شرکت">
            <Input disabled size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="company__Business_ID"
            hasFeedback={false}
            label="شناسه کسب و کار"
            rules={[rules]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="license_Type_ID"
            required={false}
            label="نوع مجوز"
            rules={[rules]}
          >
            <Select
              className="w-full"
              showSearch
              loading={License.isLoading}
              options={License.data}
              fieldNames={License.fieldNames}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="license_ID"
            label="شماره مجوز"
            required={false}
            rules={[rules]}
          >
            <Input size="large" placeholder="وارد کنید" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="license_Expire_Date"
            label="تاریخ اعتبار مجوز"
            required={false}
            rules={[rules]}
          >
            <CustomeDatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="stateId"
            label="استان"
            required={false}
            rules={[rules]}
          >
            <Select
              showSearch
              // @ts-ignore
              filterOption={filterOption}
              loading={state.isLoading}
              options={state.data}
              fieldNames={state.apiData.fieldNames}
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
  );
}
