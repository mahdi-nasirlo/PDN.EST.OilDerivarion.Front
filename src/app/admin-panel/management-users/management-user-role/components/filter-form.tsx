"use client";

import { Button, Col, Form, Row, Select } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function FilterForm() {

    const [form] = useForm();

    return (
        // <div className="box-border w-full p-6">
        <Form form={form} onFinish={() => console.log("test")} layout="vertical" >
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                        name="lastName"
                        label="نام و نام خانوادگی"
                    >
                        <Select size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                        name="year-establishment"
                        label="نام نقش"
                    >
                        <Select size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
            <Row dir="ltr">
                <Col xs={10} md={3} lg={2}>
                    <div className="flex gap-4">
                        <Button
                            className="btn-filter"
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            ثبت نقش
                        </Button>
                        <Button
                            onClick={() => form.resetFields()}
                            className="btn-delete-filter"
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            انصراف
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form >
        // </div >
    )
}
