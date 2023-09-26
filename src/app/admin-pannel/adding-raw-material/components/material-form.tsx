import React from 'react';
import {Col, Form, Input, Row, Select} from "antd";

function MaterialForm() {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{required: true, message: "لطفا نام مواد اولیه را وارد کنید"}]}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="Name"
                        label="نام ماده اولیه"
                    >
                        <Input size="large" placeholder="وارد کنید"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="year-establishment"
                        label="واحد اندازه گیری"
                    >
                        <Select disabled size="large" placeholder="انتخاب کنید"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="Is_Active"
                        label="وضعیت"
                    >
                        <Select defaultValue={true}
                                options={[{label: "فعال", value: true}, {label: "غیر فعال", value: false}]}
                                size="large" placeholder="انتخاب کنید"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="year-establishment"
                        label="کد ماده"
                    >
                        <Select disabled size="large" placeholder="انتخاب کنید"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        name="year-establishment"
                        label="فاکتور آزمون "
                    >
                        <Select disabled size="large" placeholder="انتخاب کنید"/>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}

export default MaterialForm;