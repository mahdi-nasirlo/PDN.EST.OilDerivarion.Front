import CustomDatePicker from "@/components/custome-date-picker";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

export const FormTime = ({ disable }: { disable: boolean }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Form.Item
            required={false}
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="samt_1"
            label="زمان بازدید احتمالی اول"
          >
            <CustomDatePicker />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            required={false}
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="samt_2"
            label="زمان بازدید احتمالی دوم"
          >
            <CustomDatePicker />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            required={false}
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="samt_3"
            label="زمان بازدید احتمالی سوم"
          >
            <CustomDatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Form.Item
            required={false}
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            name="samt_description"
            label="توضیحات"
          >
            <Input.TextArea
              style={{ height: 100, resize: "none" }}
              placeholder="وارد کنید"
            />
          </Form.Item>
        </Col>
      </Row>
      {!disable && (
        <Row gutter={[32, 0]}>
          <Col xs={24} md={24}>
            <Button
              disabled={disable}
              className="w-full"
              size="large"
              type={disable ? "default" : "primary"}
              htmlType="submit"
            >
              ثبت
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};
