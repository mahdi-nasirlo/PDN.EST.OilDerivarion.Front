import { Button, Col, Form, Input, Row, Select } from 'antd/lib'
import React from 'react'

export default function ResultForm() {
    return (
        <Form layout='vertical'>
            <Row gutter={[16, 12]}>
                <Col lg={8}>
                    <Form.Item
                        label="نتیجه آزمون"
                    >
                        <Input size='large' placeholder='وارد کنید' />
                    </Form.Item>
                </Col>

                <Col lg={8}>
                    <Form.Item
                        label="محدوده"
                    >
                        <Input size='large' placeholder='وارد کنید' />
                    </Form.Item>
                </Col>

                <Col lg={8}>
                    <Form.Item
                        label="حداقل قابل قبول"
                    >
                        <Input size='large' placeholder='وارد کنید' />
                    </Form.Item>
                </Col>

                <Col lg={8}>
                    <Form.Item
                        label="حداکثر قابل قبول"
                    >
                        <Input size='large' placeholder='وارد کنید' />
                    </Form.Item>
                </Col>

                <Col lg={8}>
                    <Form.Item
                        label="استاندارد آزمون"
                    >
                        <Select size='large' placeholder='انتخاب کنید' />
                    </Form.Item>
                </Col>

                <Col lg={8}>
                    <Form.Item
                        label="واحد تجدید پذیر"
                    >
                        <Input size='large' placeholder='وارد کنید' />
                    </Form.Item>
                </Col>

                <Col lg={8}>
                    <Form.Item
                        label="تجدید پذیر"
                    >
                        <Input size='large' placeholder='وارد کنید' />
                    </Form.Item>
                </Col>

                <Col lg={16}>
                    <Form.Item
                        label="توضیحات"
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 10]} className="flex items-center justify-end">
                <Col xs={24} xxl={2} md={4} sm={6}>
                    <Button
                        className='w-full'
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        ثبت
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
