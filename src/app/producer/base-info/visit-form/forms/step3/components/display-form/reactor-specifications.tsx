import { Col, Form, Input, Row } from 'antd'
import React from 'react'

export default function ReactorSpecifications() {

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="exporter"
                        label="نوع راکتور"
                        rules={[{ required: true }]}
                    >
                        <Input
                            className="w-full rounded-lg"
                            size="large"
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="issueDatePersian"
                        label="ابعاد راکتور"
                        rules={[{ required: true }]}
                    >
                        <Input
                            className="w-full rounded-lg"
                            size="large"
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="expirationDatePersian"
                        label="حداکثر دمای کاری"
                        rules={[{ required: true }]}
                    >
                        <Input
                            className="w-full rounded-lg"
                            size="large"
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="name"
                        label="حداکثر فشار کاری"
                        rules={[
                            { required: true, message: "این فیلد اجباری است" },
                            { type: "string", message: "باید به صورت متن باشد" },
                        ]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="number"
                        label="نوع ایجاد حرارت"
                        rules={[{ required: true, message: "این فیلد اجباری است" }]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="licenseTypeId"
                        label="تجهیزات گرمایشی"
                        rules={[{ required: true, message: "این فیلد اجباری است" }]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}
