"use client";

import { Button, Col, Form, Modal, Row, Spin, Typography } from 'antd';
import React from 'react'

export default function ReviewDataModalAcceptAgreement(
    { modalVisibleConfirmation, setModalVisibleConfirmation }:
        { modalVisibleConfirmation: any, setModalVisibleConfirmation: any }
) {

    const closeModal = () => {
        setModalVisibleConfirmation(false);
    };


    return (
        <>
            <Modal
                width={850}
                title={<div>
                    <div className="text-base mb-2">شرایط و قوانین</div>
                    <div className="font-normal text-sm">لطفا متن زیر را با دقت مطالعه کنید</div>
                </div>}
                visible={modalVisibleConfirmation}
                onCancel={closeModal}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={24}>
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
                <Form>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Spin size='large'>
                                <Typography>
                                    {`اینجانب `}
                                    <b style={{ fontWeight: 'bold' }}>
                                        {/* {`${data?.firstName} ${data?.lastName}`} */}
                                    </b>
                                    {` به شماره ملی `}
                                    <b style={{ fontWeight: 'bold' }}>
                                        {/* {data?.nationalCode} */}
                                    </b>
                                    {` ، سمت مدیرعامل ، شرکت `}
                                    <b style={{ fontWeight: 'bold' }}>
                                        {/* {data?.producerName} */}
                                    </b>
                                    {` با شناسه `}
                                    <b style={{ fontWeight: 'bold' }}>
                                        {/* {data?.producerNationalCode} */}
                                    </b>
                                    {` تعهد می‌نمایم نام صحیح عنوان محصول / نام صحیح مواد اولیه مصرفی
                                     و منشا تامین آن‌ها و تصویر صحیح کلیه مدارک و مستندات بدون هیچ گونه دخل و تصرفی بارگذاری شده است
                                      و هر زمان که عدم صحت مدارک و مستندات ارائه شده و یا هرگونه مغایرت و اشتباه مشخص گردد،
                                       مسئولیت هرگونه عواقب ناشی از آن را عهده دار خواهم بود و اینجانب حق هرگونه اعتراضی را از خود سلب نمایم.
                                       `}
                                </Typography>
                            </Spin>
                        </Col >
                    </Row >
                </Form >
            </Modal >
        </>
    )
}