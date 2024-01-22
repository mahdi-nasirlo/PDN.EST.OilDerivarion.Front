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
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { useForm } from "antd/es/form/Form";
import useSWR from "swr";

import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { sortByIndex } from "../../../../../../lib/sortByIndex";
import CustomeDatePicker from "../../../../../../components/CustomeDatePicker";
import { filterOption } from "../../../../../../lib/filterOption";

export default function SubmitForm() {
  const [open, setOpen] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [form] = useForm();
  const { trigger, isMutating } = useSWRMutation(
    "/Producer/SetBase",
    mutationFetcher
  );
  const { data, isLoading } = useSWR("/Producer/GetBase", listFetcher);
  const { data: licensce, isLoading: ldlicensce } = useSWR(
    "/BaseInfo/LicenseTypeGetAll",
    listFetcher
  );
  const { data: exporter, isLoading: ldexporter } = useSWR(
    "/BaseInfo/LicenseIssuerTypeGetAll",
    listFetcher
  );

  const activeCartable = async (values: any) => {
    const res = await trigger(values);
    if (res) {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    form.setFieldsValue(data);
    if (data === false || true) {
    }

    if (!isLoading) {
      setOpen(true);
    }
  }, [data]);

  return (
    <Spin spinning={isLoading}>
      <Typography className="text-right font-bold">
        اطلاعات اصلی تولید کننده
      </Typography>
      <Divider />
      <Form
        layout="vertical"
        onFinish={activeCartable}
        form={form}
        disabled={isMutating}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item name="name" label="نام شرکت">
              <Input disabled size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="nationalCode" label="شناسه ملی شرکت">
              <Input disabled size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="licenseTypeId"
              label="نوع مجوز"
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            >
              <Select
                showSearch
                fieldNames={{ label: "Name", value: "Id" }}
                // @ts-ignore
                filterOption={filterOption}
                loading={ldlicensce}
                options={sortByIndex(licensce, "Name")}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="licenseIssuerTypeId"
              label="صادر کننده"
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            >
              <Select
                showSearch
                fieldNames={{ label: "Name", value: "Id" }}
                // @ts-ignore
                filterOption={filterOption}
                loading={ldexporter}
                options={sortByIndex(exporter, "Name")}
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
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
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
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="businessNumber"
              label="شناسه کسب و کار"
              rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col xs={24} md={24}>
            <Button
              className="w-full management-info-form-submit btn-filter"
              size="large"
              type="primary"
              htmlType="submit"
            >
              ثبت
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}
