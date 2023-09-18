"use client";

import { Button, Col, DatePicker, Divider, Form, Modal, Row, Select, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'


export default function PrimaryExpiredRequestsDetailsModalSubmit({ modalVisible, setModalVisible }: { modalVisible: any, setModalVisible: any }) {


    const [form] = useForm()

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleFormSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form values:", values); // Log the form values to the console
            closeModal();
        } catch (error) {
            console.error("Form validation failed:", error);
        }
    };

    return (
        <>
            <Modal
                width={800}
                title={<div>
                    <div className="text-base mb-2">تعیین زمان تاریخ بازدید</div>
                    <div className="font-normal text-sm">لطفا زمان بازدید  و کارشناسان را انتخاب نموده و تایید نمایید.</div>
                </div>}
                visible={modalVisible}
                onCancel={closeModal}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={handleFormSubmit}
                                key={"submit"} >
                                ثبت
                            </Button >
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={closeModal}
                                key={"cancel"} >
                                بازگشت
                            </Button >
                        </Col>
                    </Row>
                ]}
            >
                <Form form={form} >
                    <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                        تعیین تاریخ و ساعت بازدید
                    </Typography>
                    <Row gutter={[32, 1]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="year"
                                label="تاریخ بازدید"
                            >
                                <DatePicker size="large" placeholder="13**/**/**" className="w-full" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="establishment"
                                label="ساعت بازدید"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                        تعیین کارگروه
                    </Typography>
                    <Row gutter={[32, 1]}>
                        <Col xs={24} md={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="establishment"
                                label="نماینده استاندارد استان"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[32, 1]}>
                        <Col xs={24} md={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="establishment"
                                label="نماینده صمت استان"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[32, 1]}>
                        <Col xs={24} md={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="establishment"
                                label="نماینده نفت استان"
                            >
                                <Select size="large" placeholder="انتخاب کنید" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}
