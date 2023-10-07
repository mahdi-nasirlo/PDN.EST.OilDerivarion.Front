"use client";

import {Button, Col, Form, Input, Row, Select} from 'antd';
import React from 'react'


export default function FilterForm() {

    return (
        <>
            {/* <div className="box-border w-full p-6"> */}
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="year-establishment" label="کد شناسایی جعبه">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="isActive" label="وضعیت">
                            <Select options={[{label: "فعال", value: true}, {label: "غیر فعال", value: false}]}
                                    size="large"
                                    placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    {/*<Col xs={24} md={12}>*/}
                    {/*    <Form.Item name="lastName" label="کد ماده">*/}
                    {/*        <Input size="large" placeholder="وارد کنید"/>*/}
                    {/*    </Form.Item>*/}
                    {/*</Col>*/}
                </Row>
                {/*<Row gutter={[16, 16]}>*/}
                {/*    <Col xs={24} md={12}>*/}
                {/*        <Form.Item name="year-estale" label="تاریخ درخواست">*/}
                {/*            <Select size="large" placeholder="وارد کنید"/>*/}
                {/*        </Form.Item>*/}
                {/*    </Col>*/}
                {/*</Row>*/}

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
                                htmlType="submit"
                            >
                                حذف فیلتر
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            {/* </div> */}
        </>
    )
}
