"use client";


import { Button, Col, Form, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function ReviewDataModalFinalSubmit(
    { modalVisibleFinalSubmit, setModalVisibleFinalSubmit }:
        { modalVisibleFinalSubmit: any, setModalVisibleFinalSubmit: any }
) {

    const [form] = useForm()

    const closeModal = () => {
        setModalVisibleFinalSubmit(false);
    };



    return (
        <>
            <Modal
                width={600}
                title={<div className="text-base">اعلان</div>}
                visible={modalVisibleFinalSubmit}
                onCancel={closeModal}
                footer={[
                    <Row key={"box"} gutter={[32, 16]} className="my-2">
                        <Col xs={24} md={24}>
                            <Button
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={closeModal}
                                key={"submit"} >
                                ثبت
                            </Button >
                        </Col>
                    </Row>
                ]}
            >
                <Form form={form} >
                    <Row gutter={[32, 1]}>
                        <Col xs={24} md={24}>
                            <Form.Item>
                                <div className='flex flex-col'>
                                    <p>نتیجه بررسی از طریق پیام کوتاه به شما اطلاع داده می شود.</p>
                                    <p>تا زمان تایید شما دسترسی لازم به پنل خود را نخواهید داشت. لطفا صبور باشید.</p>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}
