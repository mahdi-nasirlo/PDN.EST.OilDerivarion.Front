"use client";

import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react'

export default function CreateModal({ setModalVisible, modalVisible }: { setModalVisible: any, modalVisible: any }) {


    const [selectedDensity, setSelectedDensity] = useState('');

    const handleDensityChange = (value: any) => {
        setSelectedDensity(value);
    };


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
                <div className="text-base mb-2">افزودن دسته بندی جدید</div>
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
            <Form form={form} layout='vertical'>
                <Row gutter={[32, 1]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year"
                            label="نام دسته بندی"
                        >
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="lastName"
                            label="فعال/غیر فعال"
                        >
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year"
                            label="روش تولید"
                        >
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="density" label="دانسیته">
                            <Select size="large" placeholder="انتخاب کنید"
                                onChange={handleDensityChange}>
                                <Select.Option value="yes">دارد</Select.Option>
                                <Select.Option value="no">ندارد</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                {selectedDensity === 'yes' && (
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="top"
                                label="حد بالا دانسیته"
                            >
                                <Input
                                    size="large"
                                    placeholder="وارد کنید"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="bottom"
                                label="حد پایین دانسیته"
                            >
                                <Input
                                    size="large"
                                    placeholder="وارد کنید"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                )}
            </Form>
        </Modal >
    )
}