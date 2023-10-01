import React from 'react';
import {Col, Form, Input, Row, Select} from "antd";

function BoxForm() {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item rules={[{required: true}]} name="Code" label="شناسه جعبه">
                        <Input size="large" placeholder="وارد کنید"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="lastName" label="استان">
                        <Select disabled size="large" placeholder="انتخاب کنید"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item rules={[{required: true}]} name="IsActive" label="فعال/غیر فعال">
                        <Select options={[{value: true, label: "فعال"}, {value: false, label: "غیر فعال"}]} size="large"
                                placeholder="انتخاب کنید"/>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}

export default BoxForm;