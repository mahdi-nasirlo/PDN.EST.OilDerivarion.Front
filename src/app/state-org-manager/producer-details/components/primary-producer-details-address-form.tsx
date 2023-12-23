"use client";


import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import React from 'react'

export default function PrimaryProducerDetailsAddressForm() {
    return (
        <>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                اطلاعات مجوز
            </Typography>
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item name="State" label="استان">
                            <Input size="large" placeholder="تهران" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="City" label="شهرستان">
                            <Input size="large" placeholder="پردیس" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="town" label="شهرک">
                            <Input size="large" placeholder="صنعتی 1" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item name="MainSt" label="خیابان اصلی">
                            <Input size="large" placeholder="خیابان یکم" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="AuxiliaryRoad" label="خیابان فرعی">
                            <Input size="large" placeholder="خیابان دوم" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="alley" label="کوچه">
                            <Input size="large" placeholder="کوچه اول" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <Form.Item name="َAddressOffice" label="نشانی دفتر مرکزی">
                            <Input size="large" placeholder="تهران، بزرگراه رسالت، خیابان مدنی پلاک 6" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="phoneOffice" label="تلفن دفتر مرکزی">
                            <Input size="large" placeholder="02122334455" disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="phone" label="تلفن تماس کارخانه">
                            <Input size="large" placeholder="02122334455" disabled />
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
        </>
    )
}
