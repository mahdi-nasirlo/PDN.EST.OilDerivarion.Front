import { Col, Divider, Form, Input, Row, Typography } from 'antd'
import React from 'react'

export default function AddressInfoForm({ params }: { params: { nationalCode: string } }) {
    return (
        <>
            <Divider />
            <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                اطلاعات آدرس
            </Typography>

            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item name="year-establishment" label=" استان">
                            <Input size="large" disabled defaultValue="mysite" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="lastName" label="   شهرستان">
                            <Input size="large" disabled defaultValue="mysite" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="lastName" label="   شهرک">
                            <Input size="large" disabled defaultValue="mysite" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item name="year-establishment" label=" خیابان اصلی">
                            <Input size="large" disabled defaultValue="mysite" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="lastName" label="   خیابان فرعی ">
                            <Input size="large" disabled defaultValue="mysite" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="lastName" label="   کوچه">
                            <Input size="large" disabled defaultValue="mysite" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item name="year-establishment" label="  نشانی دفتر مرکزی">
                            <Input size="large" disabled defaultValue="mysite" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="year-establishment" label="  تلفن دفتر مرکزی">
                            <Input size="large" disabled defaultValue="mysite" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="  تلفن تماس کارخانه">
                            <Input size="large" disabled defaultValue="mysite" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
