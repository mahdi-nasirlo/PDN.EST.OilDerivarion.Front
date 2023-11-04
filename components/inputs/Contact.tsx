import React, { Children } from "react";
import { Form, Select } from "antd";
import { FormItemProps } from "antd/lib";

const ContactInputs = (props: FormItemProps) => {
  const validateIranianMobile = (rule: any, value: any) => {
    const mobileRegex = /^(\+98|0|0098)?9\d{9}$/;
    if (value && !mobileRegex.test(value)) {
      return Promise.reject("این شماره تماس نامتبر است");
    }
    return Promise.resolve();
  };
  return (
    <Form.Item
      {...props}
      name={props.name}
      label={props.label}
      rules={[
        { required: true, message: "این فیلد اجباری است" },
        { validator: validateIranianMobile },
      ]}
    >
      {props.children}
    </Form.Item>
  );
};

export default ContactInputs;
