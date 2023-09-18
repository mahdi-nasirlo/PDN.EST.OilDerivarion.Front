"use client";

import { Button, Col, DatePicker, Divider, Form, Input, Row, Typography } from 'antd';
import React from 'react'

export default function Page() {

    const onFinish = async (values: any) => {
        let data = { values };
        console.log(data);
    };

    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider />
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year-establishment"
                            label="تعداد کارکنان تولیدی (بر حسب نفر)"
                        >
                            <Input size="large" placeholder="مطابق لیست بیمه تامین اجتماعی" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="کد ملی"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="company-registratuon-num"
                            label="نام و نام خانوادگی"
                        >
                            <Input size="large" placeholder="13**/**/**" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="license-establish"
                            label="تاریخ تولد"
                        >
                            <DatePicker size="large" placeholder="13**/**/**" className="w-full" />
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
    )
}
