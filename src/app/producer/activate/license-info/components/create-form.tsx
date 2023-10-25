import { useForm } from "antd/es/form/Form";
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Typography, } from "antd";
import React from "react";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { CreatePresonLicence } from "../../../../../../interfaces/Base-info";
import { SvgIcon } from "@/components/layout/sidebar";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";

export default function CreateForm({ mutate }: { mutate: () => void }) {
  const [form] = useForm();

  const onFinish = async (values: CreatePresonLicence) => {
    const res = await trigger(values);

    await mutate();
    if (res) {
      form.resetFields();
    }
  };

  const { trigger, isMutating } = useSWRMutation(
    "/ProfilePersonLicense/Create",
    mutationFetcher
  );
  const { data: LicenseTypeGetAll, isLoading: ldLicenseTypeGetAll } = useSWR(
    ["/BaseInfo/LicenseTypeGetAll"],
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
              name="name"
              label="نام سند"
              rules={[
                { required: true, message: "این فیلد اجباری است" },
                { type: "string", message: "باید به صورت متن باشد" },
              ]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="number"
              label="شماره سند"
              rules={[{ required: true, message: "این فیلد اجباری است" }]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item name="licenseTypeId" label="نوع مجوز">
              <Select
                loading={ldLicenseTypeGetAll}
                options={LicenseTypeGetAll}
                fieldNames={{ value: "Id", label: "Name" }}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="exporter" label="صادر کننده">
              <Input
                className="w-full rounded-lg"
                size="large"
                placeholder="وارد کنید"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="issueDate"
              label="زمان صدور"
              rules={[{ required: true, message: "این فیلد اجباری است" }]}
            >
              <DatePicker
                className="w-full"
                placeholder="13**/**/**"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="expirationDate"
              label="تاریخ انقضاء"
              rules={[{ required: true, message: "این فیلد اجباری است" }]}
            >
              <DatePicker
                className="w-full"
                placeholder="13**/**/**"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row dir="ltr">
          <Col xs={10} md={3} lg={2}>
            <Button
              loading={isMutating}
              htmlType="submit"
              className="w-full management-info-form-submit"
              size="large"
              type="primary"
            >
              <span
                style={{ display: "flex" }}
                className="flex gap-2 justify-center"
              >
                ذخیره
                <SvgIcon src="/static/save.svg" />
              </span>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
