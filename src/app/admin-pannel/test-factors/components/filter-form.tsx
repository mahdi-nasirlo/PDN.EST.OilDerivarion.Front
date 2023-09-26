"use client"

import {Button, Col, Form, Input, Row, Select} from 'antd'
import React from 'react'
import {useForm} from "antd/es/form/Form";

export default function FilterForm({filter, unsetFilter}: {
    filter: (arg: MaterialGet) => void,
    unsetFilter: () => void,
}) {

    const [form] = useForm()


    return (
        <div className="box-border w-full p-6">
            <Form onFinish={(values) => filter(values)} form={form} name="form_item_path" layout="vertical">
                <Row gutter={[16, 0]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="name" label="نام فاکتور">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="مقیاس آزمون">
                            <Select disabled size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="تجدید پذیری">
                            <Select disabled size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="مقدار تجدید پذیری">
                            <Input disabled size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item name="lastName" label="روش آزمون">
                            <Input disabled size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row dir="ltr">
                    <Col xs={10} md={3} lg={2}>
                        <div className="flex gap-4">
                            <Button
                                className="btn-filter"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                اعمال فیلتر
                            </Button>
                            <Button
                                className="btn-delete-filter"
                                size="large"
                                type="primary"
                                onClick={unsetFilter}
                                htmlType="reset"
                            >
                                حذف فیلتر
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
