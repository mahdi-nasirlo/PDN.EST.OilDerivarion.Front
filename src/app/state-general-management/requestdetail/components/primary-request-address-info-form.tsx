"use client";


import { Col, Divider, Form, Input, Row, Typography } from 'antd'
import React from 'react'

export default function PrimaryRequestAddressInfoForm() {
    return (
        <>

            <Divider />
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                اطلاعات آدرس
            </Typography>
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <Form.Item name="lastName" label="آدرس">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <Form.Item name="lastName" label="نشانی دفتر مرکزی">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label=" تلفن تماس کارخانه">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label=" تلفن دفتر مرکزی">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>

    )
}
