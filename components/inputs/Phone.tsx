import React from "react";
import { Form } from "antd";
import { FormItemProps } from "antd/lib";

const PhoneInputs = (props: FormItemProps) => {
  const validateIranianLandline = (rule: any, value: any) => {
    const landlineRegex = /^0[0-9]{2,}[0-9]{7,}$/;
    if (value && !landlineRegex.test(value)) {
      return Promise.reject();
    }
    return Promise.resolve();
  };
  return (
    <Form.Item
      {...props}
      name={props.name}
      label={props.label}
      rules={[
        { required: true, message: "لطفا مقدار را وارد کنید" },
        { validator: validateIranianLandline },
        { max: 11, min: 11, message: "شماره تلفن ثابت نامعتبر است" },
        {},
      ]}
    >
      {props.children}
    </Form.Item>
  );
};

export default PhoneInputs;
