"use client"


import React, { useState } from 'react'
import Breadcrumb from "@/components/breadcrumb";
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button, Checkbox, Col, Form, Row, Typography } from 'antd';
import ReviewDataModalAcceptAgreement from './review-data-modal-accept-agreement';
import { Card } from '@/components/card';
import ReviewDataModalFinalSubmit from './review-data-modal-final-submit';
import { useRouter } from 'next/navigation';

export default function Page() {

    const router = useRouter();

    const [modalVisibleConfirmation, setModalVisibleConfirmation] = useState(false);

    const [modalVisibleFinalSubmit, setModalVisibleFinalSubmit] = useState(false);

    return (
        <div>
            <Breadcrumb
                pages={[
                    { label: "خانه", path: "/" },
                    { label: 'پکیج درخواستی', path: '/request' }
                ]}
                currentPage="بازبینی نهایی درخواست"
                titleIcon={<DocumentMagnifyingGlassIcon />}
            />
            <Card>
                <Typography>
                    تب های اطلاعات
                </Typography>
                <Form>
                    <Form.Item
                        className="flex mr-3 my-6 font-medium"
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ?
                                        Promise.resolve() :
                                        Promise.reject(new Error('پذیرش شرایط و قوانین برای ثبت درخواست ضروری می باشد'))
                            }
                        ]}
                    >
                        <Checkbox>
                            شرایط و
                            <span
                                className="text-primary-500 p-0"
                                onClick={() => setModalVisibleConfirmation(true)}
                            >
                                {" قوانین "}
                            </span>
                            را خوانده و و اطلاعات فوق را تایید می کنم!
                        </Checkbox>
                    </Form.Item>
                    <Row gutter={[12, 12]}>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                onClick={() => router.push('/request')}
                                type="default"
                                className="bg-gray-100 w-full"
                            >
                                بازگشت
                            </Button>
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full "
                                type="primary"
                                htmlType="submit"
                                onClick={() => setModalVisibleFinalSubmit(true)}
                            >
                                ثبت نهایی
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <ReviewDataModalAcceptAgreement
                modalVisibleConfirmation={modalVisibleConfirmation}
                setModalVisibleConfirmation={setModalVisibleConfirmation}
            />
            <ReviewDataModalFinalSubmit
                modalVisibleFinalSubmit={modalVisibleFinalSubmit}
                setModalVisibleFinalSubmit={setModalVisibleFinalSubmit}
            />
        </div>
    )
}
