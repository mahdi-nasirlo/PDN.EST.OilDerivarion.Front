import { useForm } from "antd/es/form/Form";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import React from "react";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { SetMainMember } from "../../../../../../interfaces/Base-info";
import { SvgIcon } from "@/components/layout/sidebar";
import useSWR from "swr";
import { listFetcher } from "../../../../../../lib/server/listFetcher";

export default function CreateForm({ mutate }: { mutate: () => void }) {

  const [form] = useForm();

  const { trigger, isMutating } = useSWRMutation(
    "/Producer/SetMainMember",
    mutationFetcher
  );

  const onFinish = async (values: SetMainMember) => {
    values.nationalCode = values.nationalCode.toString();

    values.currentMobile = values.currentMobile.toString();

    const res = await trigger(values);

    await mutate();
    if (res) {
      form.resetFields();
    }
  };

  const { data: CompanyRoleGetAll, isLoading: ldCompanyRoleGetAll } = useSWR(
    [
      "/BaseInfo/CompanyRoleGetAll",
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
              name="name"
              label="نام"
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
              name="lastName"
              label="نام خانوادگی"
              rules={[
                { required: true, message: "این فیلد اجباری است" },
                { type: "string", message: "باید به صورت متن باشد" },
              ]}
            >
              <Input size="large" placeholder="وارد کنید" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="nationalCode"
              label="کد ملی / کد اتباع"
              rules={[{ required: true, message: "کد ملی اجباری است" }]}
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
              name="birthDate"
              label="تاریخ تولد"
              rules={[{ required: true, message: "تاریخ تولد اجباری است" }]}
            >
              <DatePicker
                className="w-full"
                placeholder="13**/**/**"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="companyRoleId"
              label="سمت"
              rules={[{ required: true, message: "این فیلد اجباری است" }]}
            >
              <Select
                loading={ldCompanyRoleGetAll}
                options={CompanyRoleGetAll}
                fieldNames={{ value: "Id", label: "Name" }}
                size="large"
                placeholder="انتخاب کنید"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="currentMobile"
              label="شماره تماس"
              rules={[{ required: true, message: "این فیلد اجباری است" }]}
            >
              <Input
                className="w-full rounded-lg"
                size="large"
                placeholder="وارد کنید"
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
