"use client";


import {Button, Col, Form, Modal, Row} from 'antd';
import {useRouter} from 'next/navigation';
import React from 'react'

export default function ReviewDataModalFinalSubmit(
    {modalVisibleFinalSubmit, setModalVisibleFinalSubmit}:
        { modalVisibleFinalSubmit: any, setModalVisibleFinalSubmit: any }
) {

    const router = useRouter()

    const closeModal = () => {
        setModalVisibleFinalSubmit(false);
    };

    const handleFormSubmit = () => {
        router.push("/producer/dashboard/request-list")
    };


    return (
        <>
            <Modal
                width={600}
                title={<div className="text-base">اعلان</div>}
                open={modalVisibleFinalSubmit}
                closeIcon={false}
                footer={[
                    <Row key={"box"} gutter={[32, 16]} className="my-2">
                        <Col xs={24} md={24}>
                            <Button
                                size="large"
                                className="w-full"
                                type="primary"
                                onClick={handleFormSubmit}
                                key={"submit"}>
                                ثبت
                            </Button>
                        </Col>
                    </Row>
                ]}
            >
                <Form>
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
