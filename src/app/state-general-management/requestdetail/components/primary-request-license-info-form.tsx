"use client";


import { Col, DatePicker, Divider, Form, Input, Row, Typography } from 'antd'
import React from 'react'

export default function PrimaryRequestLicenseInfoForm() {
    return (
        <>

            <Divider />
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                اطلاعات مجوز
            </Typography>
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="سال تاسیس">
                            <DatePicker disabled size="large" placeholder="mysite" className="w-full" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام شرکت ثبت شده">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="شماره ثبت شرکت">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label=" شماره پروانه بهره برداری / جواز تاسیس">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label=" تاریخ صدور پروانه بهره برداری / جواز تاسیس">
                            <DatePicker disabled size="large" placeholder="mysite" className='w-full' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label=" شناسه کسب و کار">
                            <Input disabled size="large" placeholder="mysite" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>

    )
}
