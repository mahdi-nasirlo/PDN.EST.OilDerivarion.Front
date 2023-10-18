"use client";

import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import { GetPageProducer } from '../../../../../interfaces/producer';

export default function FilterForm({ filter, unsetFilter }: {
    filter: (arg: GetPageProducer) => void,
    unsetFilter: () => void,
}) {

    const [form] = useForm()

    const resetForm = () => {

        unsetFilter()

        form.resetFields
    }


    return (
        // <div className="box-border w-full mt-4 max-lg:mt-2 p-6">
        <Form onFinish={filter} name="form_item_path" layout="vertical">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="name"
                        label="نام واحد تولیدی محصول "
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="companyStatusId" label="  وضعیت حساب کاربری">
                        <Select size="large" placeholder="انتخاب کنید" />
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
                            onClick={resetForm}
                            className="btn-delete-filter"
                            size="large"
                            type="primary"
                            htmlType="reset"
                        >
                            حذف فیلتر
                        </Button>
                    </div>
                </Col>
            </Row>
            {/* <Button
                    disabled
                    className="w-full bg-green-500"
                    size="large"
                    type="primary"
                >
                    <span className="flex gap-2 justify-center ">خروجی اکسل</span>
                </Button> */}
        </Form>
        // </div >
    )
}