"use client";


import { Button, Col, Form, Input, Row, Select } from 'antd';
import React from 'react'

export default function PrimaryManufacturerListForm() {
    return (
        <div className="box-border w-full mt-4 max-lg:mt-2 p-6">
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item

                            name="year-establishment"
                            label="نام واحد تولیدی محصول "
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="  نام مدیرعامل">
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="year-establishment"
                            label="نام واحد تولیدی محصول "
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="lastName" label="  نوع مالکیت">
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="lastName" label="  وضعیت حساب کاربری">
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row dir="ltr">
                    <Col xl={3} md={24} sm={24}>
                        <div className="flex gap-4 ">
                            <Button
                                className="w-full bg-green-500"
                                size="large"
                                type="primary"
                            >
                                <span className="flex gap-2 justify-center ">خروجی اکسل</span>
                            </Button>
                            <Button
                                className="w-full btn-filter"
                                size="large"
                                type="primary"
                            >
                                <span className="flex gap-2 justify-center ">
                                    اعمال فیلتر
                                </span>
                            </Button>
                            <Button
                                className="w-full btn-delete-filter"
                                size="large"
                                type="primary"
                            >
                                <span className="flex gap-2 justify-center ">حذف فیلتر</span>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
