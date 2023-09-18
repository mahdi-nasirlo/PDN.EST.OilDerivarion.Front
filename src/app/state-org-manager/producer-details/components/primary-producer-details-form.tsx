"use client";


import { Col, Divider, Form, Input, Row } from 'antd';
import React from 'react'

export default function PrimaryProducerDetailsForm() {
    return (
        <>
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام واحد تولیدی">
                            <Input size="large" placeholder="نام شرکت تولیدی تست" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="شناسه ملی">
                            <Input size="large" placeholder="56181616545" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام مدیر عامل">
                            <Input size="large" placeholder="مدیر عامل" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نوع مالکیت">
                            <Input size="large" placeholder="خصوصی" disabled />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Divider />
        </>
    )
}
