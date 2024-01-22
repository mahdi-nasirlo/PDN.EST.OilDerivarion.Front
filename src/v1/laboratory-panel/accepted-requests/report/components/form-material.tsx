"use client";

import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd'
import React from 'react'

export default function FormMaterial() {
    return (

        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات را با دقت بررسی نمایید و سپس تایید نمایید.
            </Typography>
            <Divider />
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 0]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام فاکتور آزمون">
                            <Input size="large" placeholder="mysite" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام فاکتور آزمون">
                            <Input size="large" placeholder="mysite" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام فاکتور آزمون">
                            <Input size="large" placeholder="mysite" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام فاکتور آزمون">
                            <Input size="large" placeholder="mysite" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام فاکتور آزمون">
                            <Input size="large" placeholder="mysite" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام فاکتور آزمون">
                            <Input size="large" placeholder="mysite" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام فاکتور آزمون">
                            <Input size="large" placeholder="mysite" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <div className='flex gap-6'>
                    <Button
                        className="w-1/2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        تایید زمان بازدید
                    </Button>
                    <Button
                        className="w-1/2 bg-red-500"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        عدم تایید
                    </Button>
                </div>
            </Form>
        </>)
}
