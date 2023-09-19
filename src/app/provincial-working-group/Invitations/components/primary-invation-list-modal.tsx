"use client";


import { Button, Col, Form, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function PrimaryInvationListModal({ modalVisible, setModalVisible }: { modalVisible: any, setModalVisible: any }) {

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
                width={600}
                title={<div>
                    <div className="text-base mb-2">دعوت نامه</div>
                    <div className="font-normal text-sm">دعوت نامه زیر از طرف امیرحسام خالویی در تاریخ 1401/01/01 برای شما ارسال شده است.</div>
                </div>}
                visible={modalVisible}
                onCancel={closeModal}
                footer={[
                    <Row key={"box"} gutter={[32, 16]} className="my-2">
                        <Col xs={24} md={24}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                type="primary"
                                onClick={handleFormSubmit}
                                key={"submit"} >
                                بازگشت
                            </Button >
                        </Col>
                    </Row>
                ]}
            >
                <Form>
                    <Row gutter={[32, 1]}>
                        <Col xs={24} md={24}>
                            <Form.Item>
                                <div className='flex flex-col'>
                                    <p className='mb-4'>با سلام و احترام؛</p>
                                    <p>نماینده محترم استاندارد استان</p>
                                    <p>خواهشمند است در ساعت 14:00 روز دوشنبه مورخ 1401/01/01 در محل تولیدی نام شرکت تولیدی تست
                                        واقع در شهرک صنعتی عظیمی، خیابان رفتاری، پلاک 5 جهت انجام بازدید فرآیند کدگذاری حضور بهم رسانید.</p>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}
