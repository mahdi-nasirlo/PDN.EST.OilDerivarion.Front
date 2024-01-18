"use client";

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useContext } from "react";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { SetBase } from "../../../../../interfaces/Base-info";
import useSWRMutation from "swr/mutation";
import { useForm } from "antd/es/form/Form";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import StepContext from "../stete-manager/step-context";
import { filterOption } from "../../../../../lib/filterOption";

export default function CreatorProduction() {
  const processController = useContext(StepContext);
  const [form] = useForm();

  const { trigger, isMutating } = useSWRMutation(
    "/Producer/SetBase",
    mutationFetcher
  );

  const onFinish = async (values: SetBase) => {
    const res = await trigger(values);

    if (res) {
      processController.dispatch({ type: "NEXT", stepNumber: 7 });
    }
  };

  const { data: CompanyOwnershipTypeGetAll, isLoading: ldCompanyOwnership } =
    useSWR(
      [
        "/BaseInfo/CompanyOwnershipTypeGetAll",
        {
          name: null,
          IsActive: null,
        },
      ],
      ([url, arg]: [string, any]) => listFetcher(url, { arg })
    );

  return (
    <>
      <Typography className="text-right font-medium text-base">
        لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
      </Typography>
      <Divider />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="currentCEOName"
              label="نام مدیر عامل"
              rules={[
                {
                  required: true,
                  message: "لطفا مقدار را وارد کنید"
                },
              ]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="currentCEOLastName"
              label="نام خانوادگی مدیر عامل"
              rules={[
                {
                  required: true,
                  message: "لطفا مقدار را وارد کنید"
                },
              ]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="currentCEONationalCode"
              label="شماره ملی"
              rules={[
                { required: true, message: "لطفا مقدار را وارد کنید" },
                {
                  pattern: /^(?!(\d)\1{9})\d{10}$/,
                  message: "شماره ملی نامعتبر است",
                },
              ]}
            >
              <Input
                size="large"
                className="w-full rounded-lg"
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="نام واحد تولیدی"
              rules={[
                {
                  required: true,
                  message: "لطفا مقدار را وارد کنید"
                },
              ]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="companyOwnershipTypeId"
              label="نوع مالکیت"
              rules={[
                {
                  required: true,
                  message: "لطفا مقدار را انتخاب کنید"
                },
              ]}
            >
              <Select
                showSearch
                // @ts-ignore
                filterOption={filterOption}
                loading={ldCompanyOwnership}
                options={CompanyOwnershipTypeGetAll}
                fieldNames={{ value: "Id", label: "Name" }}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Button
          loading={isMutating}
          className="w-full management-info-form-submit btn-filter"
          size="large"
          type="primary"
          htmlType="submit"
        >
          ثبت
        </Button>
      </Form>
    </>
  );
}
