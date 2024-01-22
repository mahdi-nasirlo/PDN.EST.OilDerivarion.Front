"use client";


import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react'


export default function FilterForm() {
    return (
        // <div className="box-border w-full mt-4 max-lg:mt-2 p-6">
        <Form name="form_item_path" layout="vertical">
            <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="year-establishment"
                        label="کد ماده"
                    >
                        <Input disabled size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="lastName" label="شناسه درخواست">
                        <Input disabled size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="year-establishment"
                        label="فعال / غیر فعال     "
                    >
                        <Input disabled size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="lastName" label="  نام مدیرعامل">
                        <Input disabled size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
            <Row dir="ltr">
                <Col xl={3} md={24} sm={24}>
                    <div className="flex gap-4 ">
                        <Button
                            disabled
                            className="w-full btn-delete-filter"
                            size="large"
                            type="primary"
                        >
                            <span className="flex gap-2 justify-center ">حذف فیلتر</span>
                        </Button>
                        <Button
                            disabled
                            className="w-full btn-filter"
                            size="large"
                            type="primary"
                        >
                            <span className="flex gap-2 justify-center ">
                                اعمال فیلتر
                            </span>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
        // </div>
    )
}
