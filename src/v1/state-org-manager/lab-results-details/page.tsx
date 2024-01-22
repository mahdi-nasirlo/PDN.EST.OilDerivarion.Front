"use client";


import React, { useState } from 'react'
import { Button, Checkbox, Col, Divider, Form, Input, Modal, Row, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';


export default function Page() {

    const [form] = useForm()
    const [modalVisibleCancel, setModalVisibleCancel] = useState(false);

    const closeModal = () => {
        setModalVisibleCancel(false);
    };

    const showModalCancel = () => {
        setModalVisibleCancel(true);
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
            <div className="box-border w-full p-6">
                <Typography className="text-right font-medium text-base">
                    لطفا اطلاعات را با دقت وارد نموده و سپس تایید نمایید.
                </Typography>
                <Divider />
                <Form name="form_item_path" layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" placeholder="امیر احمدی" disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" placeholder="مقدار آزمایش" disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" placeholder="مقدار آزمایش" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" placeholder="مقدار آزمایش" disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="year" label="نام فاکتور">
                                <Input size="large" placeholder="مقدار آزمایش" disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" placeholder="مقدار آزمایش" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={24}>
                            <Form.Item name="years" label="شرح">
                                <Input.TextArea
                                    disabled
                                    className="mt-2 bg-gray-50"
                                    placeholder="توضیحات"
                                    autoSize={{ minRows: 5, maxRows: 8 }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <div className='flex gap-6'>
                        <Button
                            className="w-1/2"
                            size="large"
                            type="primary"
                            htmlType="submit"
                        // onClick={showModal}
                        >
                            تایید
                        </Button>
                        <Button
                            className="w-1/2 bg-red-500"
                            size="large"
                            type="primary"
                            htmlType="submit"
                            onClick={showModalCancel}
                        >
                            عدم تایید
                        </Button>
                    </div>
                </Form>
            </div>
            <Modal
                width={600}
                title={<div>
                    <div className="text-base mb-2">عدم تایید</div>
                    <div className="font-normal text-sm">لطفا دلیل عدم تایید را انتخاب نمایید تا به واحد تولیدی اعلام گردد.</div>
                </div>}
                visible={modalVisibleCancel}
                onCancel={closeModal}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={12} md={12}>
                            <Button
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={handleFormSubmit}
                                key={"submit"} >
                                ثبت
                            </Button >
                        </Col>
                        <Col xs={12} md={12}>
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
                    <Row gutter={[32, 1]}>
                        <Col>
                            <Checkbox className="py-3">
                                عدم دریافت فاکتورهای آزمون لازم
                            </Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[32, 1]}>
                        <Col>
                            <Checkbox className="py-3">
                                سایر موارد
                            </Checkbox>
                        </Col>
                    </Row>
                    <Row gutter={[32, 1]} >
                        <Col xs={24}>
                            <Input.TextArea
                                className="mt-2 bg-gray-50"
                                placeholder="توضیحات"
                                autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}
