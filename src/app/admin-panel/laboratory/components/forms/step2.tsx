import React from 'react';
import {Col, Form, FormInstance, Input, Row} from "antd";

function Step2({form, handleSubmit, isLoading}: {
    isLoading: boolean,
    form: FormInstance,
    handleSubmit: (values: SaveFormResponsible) => void
}) {
    return (
        <>
            <Form form={form} onFinish={handleSubmit} disabled={isLoading}>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item labelCol={{span: 24}} rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                                   name="responsibleFirstName"
                                   label="نام">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item labelCol={{span: 24}} rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                                   name="responsibleLastName"
                                   label="نام خانوادگی">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item labelCol={{span: 24}} rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                                   name="responsibleNationalCode"
                                   label="کد ملی">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item labelCol={{span: 24}} rules={[{required: true, message: "لطفا مقدار را وارد کنید"}]}
                                   name="responsibleMobile"
                                   label="شماره موبایل">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Step2;