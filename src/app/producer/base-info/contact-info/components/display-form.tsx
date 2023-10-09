import { Col, Form, Input, Row } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function DisplayForm() {

    const [form] = useForm();

    return (
        <>
            <Form name="form_item_path" layout="vertical" form={form} disabled>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year-establishment"
                            label="استان"
                        >
                            <Input size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="شهرستان"
                        >
                            <Input size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="company-registratuon-num"
                            label="شهرک"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="license-establish"
                            label="خیابان اصلی"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="operation-license"
                            label="خیابان فرعی"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name={"phone_number"}
                            label="کوچه"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="operation-license"
                            label="نشانی دفتر مرکزی"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="operation-license"
                            label="تلفن دفتر مرکزی"
                        >
                            <Input className="w-full rounded-lg" size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name={"phone_number"}
                            label="تلفن تماس کارخانه"
                        >
                            <Input className="w-full rounded-lg" size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )

}
