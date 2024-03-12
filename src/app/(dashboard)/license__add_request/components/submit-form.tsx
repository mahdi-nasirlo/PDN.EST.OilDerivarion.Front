"use client";

import { Button, Col, Form, Input, Row, Select, Spin } from "antd";
import React, { useEffect } from "react";
import CustomeDatePicker from "../../../../components/custome-date-picker";
import { useValidation } from "@/hooks/use-validation";
import useProducerInfo from "../hook/use-producer-info";
import licenseApi from "constance/license";
import useGetAllState from "@/hooks/basic/role_determination/state/use-get-all-state";
import { filterOption } from "@/lib/filterOption";

export default function SubmitForm() {
  const state = useGetAllState();

  const { producerInfo, license, addLicense } = useProducerInfo();

  const [form, rules] = useValidation(licenseApi.AddRequest.type);
  useEffect(() => {
    if (producerInfo.data) {
      form.setFieldsValue(producerInfo.data);
    }
    if (addLicense.isSuccess) {
      form.resetFields(addLicense.data);
    }
  }, [producerInfo.data]);

  return (
    <Spin spinning={license.isFetching || producerInfo.isFetching}>
      <Form
        layout="vertical"
        form={form}
        onFinish={(data) => addLicense.mutateAsync(data)}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item name="representative__Name" label="نام">
              <Input disabled size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="representative__Family" label="نام خانوادگی">
              <Input disabled size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item name="representative__National_Code" label="کدملی">
              <Input
                disabled
                type="number"
                size="large"
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="company__Name" label="نام شرکت">
              <Input disabled size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item name="company__National_ID" label="شناسه ملی شرکت">
              <Input disabled size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="company__Business_ID"
              hasFeedback={false}
              label="شناسه کسب و کار"
              rules={[rules]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="license_Type_ID"
              required={false}
              label="نوع مجوز"
              rules={[rules]}
            >
              <Select
                showSearch
                size="large"
                className="w-full"
                placeholder="انتخاب کنید"
                options={license.data}
                loading={license.isLoading}
                fieldNames={license.fieldNames}
                filterOption={(input, option) =>
                  filterOption(input, option, license.fieldNames.label)
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="license_Number"
              label="شماره مجوز"
              required={false}
              rules={[rules]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="license_Expire_Date_Fa"
              label="تاریخ اعتبار مجوز"
              required={false}
              rules={[rules]}
            >
              <CustomeDatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="state_Uid"
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
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={addLicense.isPending}
          >
            ارسال درخواست
          </Button>
        </div>
      </Form>
    </Spin>
  );
}
