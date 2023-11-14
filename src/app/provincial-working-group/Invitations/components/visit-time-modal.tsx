"use client";


import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import CustomeDatePicker from '../../../../../components/CustomeDatePicker';


export default function VisitTimeModal(
    { VisitTimeModalVisible, setVisitTimeModalVisible }:
        { VisitTimeModalVisible: any, setVisitTimeModalVisible: any }
) {

    const [form] = useForm()

    const closeModal = () => {
        form.resetFields();
        setVisitTimeModalVisible(false);
    };

    const handleFormSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form values:", values);
            closeModal();
        } catch (error) {
            console.error("Form validation failed:", error);
        }
    };

    return (
        <>
            <Modal
                width={800}
                title="جزئیات زمان بازدید"
                visible={VisitTimeModalVisible}
                onCancel={closeModal}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={() => form.submit()}
                                key={"submit"}
                            >
                                ثبت
                            </Button>
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={() => {
                                    form.resetFields();
                                    setVisitTimeModalVisible(false);
                                }}
                                key={"cancel"}
                            >
                                انصراف
                            </Button>
                        </Col>
                    </Row>,
                ]}
            >
                <Form layout='vertical' form={form} onFinish={handleFormSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name='test1'
                                rules={[{ required: true }]}
                                label='زمان بازدید احتمالی اول'
                            >
                                <CustomeDatePicker />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name='test2'
                                rules={[{ required: true }]}
                                label='زمان بازدید احتمالی دوم'
                            >
                                <CustomeDatePicker />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name='test3'
                                rules={[{ required: true }]}
                                label='زمان بازدید احتمالی سوم'
                            >
                                <CustomeDatePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={24}>
                            <Form.Item
                                name="processDescription"
                                label="توضیحات"
                            >
                                <Input.TextArea
                                    style={{ height: 120, resize: "none" }}
                                    placeholder="( اختیاری )  وارد کنید"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}