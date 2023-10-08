"use client";

import { Button, Col, Form, Row, Select } from 'antd'
import React from 'react'

export default function FilterForm() {
    return (
        <div className="box-border w-full p-6">
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام و نام خانوادگی">
                            <Select size="large" placeholder="وارد کنید" tokenSeparators={[',']} mode="multiple" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
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
                                className="btn-filter px-10"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                ثبت
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
