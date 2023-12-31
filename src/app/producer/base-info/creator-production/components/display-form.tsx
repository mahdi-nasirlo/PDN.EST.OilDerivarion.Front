import { Col, Form, Input, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useForm } from 'antd/es/form/Form';


export default function DisplayForm({ data, isLoading }: { data: any, isLoading: any }) {

    const [form] = useForm();

    useEffect(() => {

        form.setFieldsValue(data)

    }, [data])

    return (
        <>
            <Spin spinning={isLoading}>
                <Form disabled layout="vertical" form={form}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="currentCEOName"
                                label="نام مدیر عامل"
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="currentCEOLastName"
                                label="نام خانوادگی مدیر عامل"
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="currentCEONationalCode"
                                label="شماره ملی"
                            >
                                <Input size="large" className="w-full rounded-lg" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="name"
                                label="نام واحد تولیدی"
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="companyOwnershipTypeName"
                                label="نوع مالکیت"
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </>
    )
}
