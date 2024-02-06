import CustomDatePicker from "@/components/custome-date-picker";
import {Button, Col, Form, Input, Row} from "antd";
import React from "react";

export const FormTime = () => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        required={false}
                        rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        name="t1_Str"
                        label="زمان بازدید احتمالی اول"
                    >
                        <CustomDatePicker/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        required={false}
                        rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        name="t2_Str"
                        label="زمان بازدید احتمالی دوم"
                    >
                        <CustomDatePicker/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        required={false}
                        rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        name="description"
                        label="زمان بازدید احتمالی سوم"
                    >
                        <CustomDatePicker/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={24}>
                    <Form.Item
                        required={false}
                        rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                        name="t3_Str"
                        label="توضیحات"
                    >
                        <Input.TextArea
                            style={{height: 100, resize: "none"}}
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[32, 0]}>
                <Col xs={24} md={24}>
                    <Button
                        className="w-full"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        ثبت
                    </Button>
                </Col>
            </Row>
        </>
    );
};
