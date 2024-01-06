import { useForm } from "antd/es/form/Form";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import React from "react";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { SetEmployeeMember } from "../../../../../../interfaces/Base-info";
import { SvgIcon } from "@/components/layout/sidebar";
import CustomDatePicker from "../../../../../../components/CustomeDatePicker";
import PhoneInputs from "../../../../../../components/inputs/Phone";

export default function CreateForm({ mutate }: { mutate: () => void }) {
  const [form] = useForm();

  const { trigger, isMutating } = useSWRMutation(
    "/Producer/SetEmployeeMember",
    mutationFetcher
  );

  const onFinish = async (values: SetEmployeeMember) => {
    // values.nationalCode = values.nationalCode.toString();

    // values.mobileNumber = values.mobileNumber.toString();

    const res = await trigger(values);

    await mutate();
    if (res) {
      form.resetFields();
    }
  };

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
                { required: true, message: "لطفا مقدار را وارد کنید" },
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
                { required: true, message: "لطفا مقدار را وارد کنید" },
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
              label="شماره ملی / کد اتباع"
              rules={[
                { required: true, message: "لطفا مقدار را وارد کنید" },
                {
                  validator(_, value) {
                    const inputValue = value.replace(/[^0-9]/g, '');
                    const len = inputValue.length
                    const NationalCode = /^(?!(\d)\1{9})\d{10}$/.test(inputValue);
                    const CitizenCode = /^[0-9]{12}$/.test(inputValue);

                    if (len === 10 && !NationalCode) {
                      return Promise.reject("شناسه ملی نامعتبر است");
                    } else if (len === 12 && !CitizenCode) {
                      return Promise.reject("کد اتباع 12 رقمی است");
                    } else if (len !== 10 && len !== 12) {
                      return Promise.reject("لطفاً شناسه ملی (10 رقمی) یا کد اتباع (12 رقمی) وارد کنید");
                    }
                    return Promise.resolve();
                  },
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
              name="birthDatePersian"
              label="تاریخ تولد"
              rules={[{ required: true, message: "لطفا تاریخ را انتخاب کنید" }]}
            >
              <CustomDatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <PhoneInputs label="شماره تماس" name="currentMobile">
              <Input
                className="w-full rounded-lg"
                size="large"
                placeholder="وارد کنید"
              />
            </PhoneInputs>
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
