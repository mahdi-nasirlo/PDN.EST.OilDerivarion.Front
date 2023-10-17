import { Col, Form, Input, Row, Spin, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'

export default function DisplayForm({ data, isLoading }: { data: any, isLoading: any }) {

    const [form] = useForm();

    useEffect(() => {

        form.setFieldsValue(data)

    }, [data])


    return (
        <>
            <Spin spinning={isLoading}>
                <Form layout="vertical" form={form} disabled>
                    <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                        اطلاعات کارخانه
                    </Typography>
                    <Row gutter={[16, 1]}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="factoryStateName"
                                label="استان"
                            >
                                <Input size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="factoryCityName"
                                label="شهرستان"
                            >
                                <Input size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="factoryPhone"
                                label="شماره تماس"
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="factoryAddressDetail"
                                label="جزئیات آدرس"
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                        اطلاعات دفتر مرکزی
                    </Typography>
                    <Row gutter={[16, 1]}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="centralOfficeStateName"
                                label="استان"
                            >
                                <Input size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="centralOfficeCityName"
                                label="شهرستان"
                            >
                                <Input size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="centralOfficePhone"
                                label="شماره تماس"
                            >
                                <Input size="large" placeholder="وارد کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="centralOfficeAddressDetail"
                                label="جزئیات آدرس"
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
