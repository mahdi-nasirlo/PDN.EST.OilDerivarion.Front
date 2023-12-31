"use client";


import { Col, Divider, Form, Input, Row, Typography } from 'antd'
import React from 'react'

export default function PrimaryRequestsListForm() {
    return (
        <>

            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت بررسی و سپس گزارش خود را ارسال نمایید.
            </Typography>
            <Divider />
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام واحد تولیدی">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="شماره ملی / کد اتباع">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نوع مالکیت">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="تعداد کارکنان تولیدی (بر حسب نفر)">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>
                </Row>


            </Form>
        </>
    )
}
