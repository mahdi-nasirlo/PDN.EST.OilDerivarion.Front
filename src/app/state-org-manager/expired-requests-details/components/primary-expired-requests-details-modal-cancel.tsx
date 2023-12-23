"use client";

import { Button, Checkbox, Col, Form, Input, Modal, Row } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'


export default function PrimaryExpiredRequestsDetailsModalCancel({ modalVisibleCancel, setModalVisibleCancel }: { modalVisibleCancel: any, setModalVisibleCancel: any }) {


    const [form] = useForm()

    const closeModal = () => {
        setModalVisibleCancel(false);
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
            width={600}
            title={<div>
                <div className="text-base mb-2">عدم تایید</div>
                <div className="font-normal text-sm">لطفا دلیل عدم تایید را انتخاب نمایید تا به واحد تولیدی اعلام گردد.</div>
            </div>}
            visible={modalVisibleCancel}
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
                <Row gutter={[16, 16]}>
                    <Col >
                        <Checkbox className="py-3">
                            نقص در پرسشنامه
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Checkbox className="py-3">
                            نقص در فرمولاسیون
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Checkbox className="py-3">
                            سایر موارد
                        </Checkbox>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
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
    )
}