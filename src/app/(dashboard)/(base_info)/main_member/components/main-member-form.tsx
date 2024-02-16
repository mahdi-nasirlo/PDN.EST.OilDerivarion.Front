import CustomDatePicker from "@/components/custome-date-picker";
import PhoneInputs from "@/components/inputs/Phone";
import { Col, Form, Input, Row, Select } from "antd/lib";
import React from "react";

export const MainMemberForm = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            required={false}
            name="first_Name"
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
            required={false}
            name="last_Name"
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
            required={false}
            name="national_Code"
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
            required={false}
            name="birthDate"
            label="تاریخ تولد"
            rules={[{ required: true, message: "لطفا تاریخ را انتخاب کنید" }]}
          >
            <CustomDatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            required={false}
            name="company_Role_Id"
            label="سمت"
            rules={[{ required: true, message: "لطفا مقدار را انتخاب کنید" }]}
          >
            <Select
              showSearch
              //@ts-ignore

              options={[
                { label: "مدیرعامل", value: 1 },
                { label: "عضو هیئت مدیره", value: 2 },
                { label: "مدیر کارخانه", value: 3 },
                { label: "پرسنل", value: 4 },
                { label: "مدیر کنترل کیفیت", value: 5 },
                { label: "مدیر تولید", value: 6 },
              ]}
              size="large"
              placeholder="انتخاب کنید"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <PhoneInputs name="mobile" label="شماره تماس">
            <Input
              className="w-full rounded-lg"
              size="large"
              placeholder="وارد کنید"
            />
          </PhoneInputs>
        </Col>
      </Row>
    </>
  );
};
