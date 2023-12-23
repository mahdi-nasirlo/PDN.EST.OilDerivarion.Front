import React from "react";
import { Col, Form, FormInstance, Input, Row } from "antd";
import CustomDatePicker from "../../../../../../../components/CustomeDatePicker";

interface PropsType {
  onFinish: (arg?: any) => any;
  form: FormInstance;
}

const DateOfVisitForm = (props: PropsType) => {
  return (
    <Form
      onFinish={props.onFinish}
      // disabled={isMutating}
      form={props.form}
      layout="vertical"
      className="mb-3"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Form.Item
            rules={[{ required: true, message: "لطفا تاریخ را انتخاب کنید" }]}
            name="datePersian1"
            label="تاریخ بازدید احتمالی اول"
          >
            <CustomDatePicker />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name="datePersian2"
            rules={[{ required: true }]}
            label="تاریخ بازدید احتمالی دوم"
          >
            <CustomDatePicker />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            rules={[{ required: true, message: "لطفا تاریخ را انتخاب کنید" }]}
            name="datePersian3"
            label="تاریخ بازدید احتمالی سوم"
          >
            <CustomDatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Form.Item
            name="description"
            label="توضیحات"
            rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
          >
            <Input.TextArea
              style={{ height: 100, resize: "none" }}
              placeholder="وارد کنید"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DateOfVisitForm;
