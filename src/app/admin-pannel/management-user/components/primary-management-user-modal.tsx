"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function PrimaryManagementUserModal({ modalVisible, setModalVisible }: { modalVisible: any, setModalVisible: any }) {

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
        <Modal
            width={800}
            title={<div>
                <div className="text-base mb-2">افزودن کاربر جدید</div>
                <div className="font-normal text-sm">لطفا اطلاعات را وارد نمایید.</div>
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
                            انصراف
                        </Button >
                    </Col>
                </Row>
            ]}
        >
            <Form form={form} >
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="year-establishment" label="نام">
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="lastName" label="نام خانوادگی">
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="year-establishment" label="کد ملی">
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }} name="lastName" label="شناسه کاربری">
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="year-establishment" label="شماره تماس">
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="lastName" label="استان">
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="year-establishment"
                            label="شهر"
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="year-establishment"
                            label="فعال/غیر فعال"
                        >
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="year-establishment" label="نقش">
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal >)
}
