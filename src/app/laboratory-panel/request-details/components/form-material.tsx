"use client";

import { Col, Divider, Form, Input, Row, Typography } from 'antd'
import React from 'react'

export default function FormMaterial() {
    return (

        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات را با دقت بررسی نمایید و سپس تایید نمایید.
            </Typography>
            <Divider />
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="کد ماده">
                            <Input size="large" placeholder="mysite" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="زمان باقی مانده">
                            <Input size="large" placeholder="mysite" disabled />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>)
}
