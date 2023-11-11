import { Col, Form, Input, Row } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'

export default function DisplayForm() {

    const [form] = useForm();

    return (
        <Form form={form} disabled={true} layout="vertical">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="exporter"
                        label="روش شیرین سازی"
                        rules={[{ required: true }]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="Test"
                        label="موارد مورد مصرف"
                        rules={[{ required: true }]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
