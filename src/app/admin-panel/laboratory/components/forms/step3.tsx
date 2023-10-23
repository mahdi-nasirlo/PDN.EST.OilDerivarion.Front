import React from 'react';
import { Col, Form, FormInstance, Input, Row } from "antd";

function Step3({ form, handleSubmit, isLoading }: {
    isLoading: boolean;
    form: FormInstance,
    handleSubmit: (values: SaveFormManager) => void
}) {
    return (
        <>
            <Form disabled={isLoading} form={form} onFinish={handleSubmit} layout='vertical'>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="managerFirstName"
                            label="نام"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="managerLastName"
                            label="نام خانوادگی"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="managerNationalCode"
                            label="کد ملی"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="managerMobile"
                            label="شماره موبایل"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Step3;