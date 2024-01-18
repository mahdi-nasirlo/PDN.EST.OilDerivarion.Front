import React from "react";
import { Form } from "antd";
import { FormItemProps } from "antd/lib";

const PhoneInputs = (props: FormItemProps) => {
  const validateIranianLandline = (rule: any, value: any) => {
    const landlineRegex = /^0\d{10}$/; // Updated regex for exactly 11 digits
    if (value && !landlineRegex.test(value)) {
      return Promise.reject("شماره تماس نامعتبر است");
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
      ]}
    >
      {props.children}
    </Form.Item>
  );
};

export default PhoneInputs;
