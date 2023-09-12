"use client";

import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Typography, } from "antd";
import React from "react";

export default function Page() {
    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider />
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year-establishment"
                            label="استان "
                            rules={[
                                { required: true, message: "این فیلد اجباری است" },
                                { type: "string" },
                            ]}
                        >
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="شهرستان"
                            rules={[
                                { required: true, message: "این فیلد اجباری است" },
                                { type: "string" },
                            ]}
                        >
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="company-registratuon-num"
                            label="شهرک"
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
                            name="license-establish"
                            label="خیابان اصلی"
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
                            name="operation-license"
                            label="خیابان فرعی"
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
                            name={"phone_number"}
                            label="کوچه"
                            rules={[
                                { required: true, message: "این فیلد اجباری است" },
                                { type: "string", message: "باید به صورت متن باشد" },
                            ]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="operation-license"
                            label="نشانی دفتر مرکزی"
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
                            name="operation-license"
                            label="تلفن دفتر مرکزی"
                            rules={[
                                { required: true, message: "این فیلد اجباری است" },
                                { type: "number", message: "باید به صورت عدد باشد" },
                            ]}
                        >
                            <InputNumber className="w-full rounded-lg" size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name={"phone_number"}
                            label="تلفن تماس کارخانه"
                            rules={[
                                { required: true, message: "این فیلد اجباری است" },
                                { type: "number", message: "باید به صورت عدد باشد" },
                            ]}
                        >
                            <InputNumber className="w-full rounded-lg" size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <div className="flex gap-6">
                    <Button
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        <span className="flex gap-3 justify-center "> ثبت</span>
                    </Button>
                </div>
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
