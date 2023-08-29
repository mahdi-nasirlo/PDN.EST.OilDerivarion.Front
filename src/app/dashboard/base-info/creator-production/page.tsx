"use client";

import {Alert, Button, Col, Divider, Form, Input, InputNumber, Row,} from "antd";
import React from "react";
import staticMessages from "../../../../../lib/staticMessages";

export default function NewRequest() {
    return (
        <>
            <Alert
                className="border-none w-full text-right text-base font-normal text-red-500"
                message={staticMessages.formAlert}
                type="error"
            />
            <Divider/>
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="مدیرعامل"
                            rules={[
                                {
                                    required: true,
                                    message: "این فیلد اجباری است",
                                },
                                {
                                    type: "string",
                                },
                            ]}
                        >
                            <Input size="large"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="national-code"
                            label="شناسه ملی"
                            rules={[
                                {required: true, message: "کد ملی اجباری است"},
                                {
                                    validator: (_, value) => {
                                        if (!value || value.length === 10) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("کد ملی باید ۱۰ رقم باشد");
                                    },
                                },
                            ]}
                        >
                            <InputNumber size="large" className="w-full rounded-lg"/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="نام واحد تولیدی"
                            rules={[
                                {required: true, message: "این فیلد اجباری است"},
                                {type: "string", message: "باید به صورت متن باشد"},
                            ]}
                        >
                            <Input size="large"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="نوع مالکیت"
                            rules={[
                                {required: true, message: "این فیلد اجباری است"},
                                {type: "string"},
                            ]}
                        >
                            <Input size="large"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider/>

                <Button
                    className="w-full management-info-form-submit btn-filter"
                    size="large"
                    type="primary"
                    htmlType="submit"
                >
                    <span className="flex gap-2 justify-center "> ثبت</span>
                </Button>
            </Form>
        </>
    );
}

// const MyFormItemContext = React.createContext<(string | number)[]>([]);

// interface MyFormItemGroupProps {
//   prefix: string | number | (string | number)[];
//   children: React.ReactNode;
// }

// function toArr(
//   str: string | number | (string | number)[]
// ): (string | number)[] {
//   return Array.isArray(str) ? str : [str];
// }

// const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatPath = React.useMemo(
//     () => [...prefixPath, ...toArr(prefix)],
//     [prefixPath, prefix]
//   );

//   return (
//     <MyFormItemContext.Provider value={concatPath}>
//       {children}
//     </MyFormItemContext.Provider>
//   );
// };

// const MyFormItem = ({ name, ...props }: FormItemProps) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatName =
//     name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

//   return <Form.Item name={concatName} {...props} />;
// };
