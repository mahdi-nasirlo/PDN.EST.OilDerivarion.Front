"use client";


import { Button, Col, Divider, Form, Input, Row } from 'antd';
import React from 'react'

export default function Page() {
    return (
        <div className="box-border w-full p-6">
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="year-establishment" label="نام کارشناس ">
                            <Input size="large" placeholder="امیر احمدی" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="شماره ملی">
                            <Input size="large" placeholder="00123456789" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="year-estale" label="شماره همراه">
                            <Input size="large" placeholder="09123456789" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="year" label="فعال/غیر فعال">
                            <Input size="large" placeholder="فعال" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="years" label="اداره مربوطه">
                            <Input size="large" placeholder="استاندارد" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="year" label="استان مربوطه">
                            <Input size="large" placeholder="تهران" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Button
                    className="w-full"
                    size="large"
                    type="primary"
                    htmlType="submit"
                >
                    بازگشت
                </Button>
            </Form>

        </div>
    )
}
