"use client";

import { Button, Col, Form, Modal, Row, Spin, Typography } from 'antd';
import React from 'react'
import { useGetUserInfo } from "@/hooks/sso/use-get-user-info";

interface TProps {
    modalVisibleConfirmation: any,
    setModalVisibleConfirmation: any
}

export default function ReviewDataModalAcceptAgreement({
    modalVisibleConfirmation,
    setModalVisibleConfirmation
}: TProps) {
    const dataUserInfo = useGetUserInfo()
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
                            <Spin size='large' spinning={false}>
                                <Typography>
                                    {`اینجانب `}
                                    <b style={{ fontWeight: 'bold' }}>
                                        {`${dataUserInfo.data?.firstName} ${dataUserInfo.data?.lastName}`}
                                    </b>
                                    {` به شماره ملی `}
                                    <b style={{ fontWeight: 'bold' }}>
                                        {dataUserInfo.data?.nationalCode}
                                    </b>
                                    {` ، سمت مدیرعامل ، شرکت `}
                                    <b style={{ fontWeight: 'bold' }}>
                                        {dataUserInfo.data?.companyName}
                                    </b>
                                    {` با شناسه `}
                                    <b style={{ fontWeight: 'bold' }}>
                                        {dataUserInfo.data?.postalCode}
                                    </b>
                                    {` تعهد می‌نمایم نام صحیح عنوان محصول / نام صحیح مواد اولیه مصرفی
                                     و منشا تامین آن‌ها و تصویر صحیح کلیه مدارک و مستندات بدون هیچ گونه دخل و تصرفی بارگذاری شده است
                                      و هر زمان که عدم صحت مدارک و مستندات ارائه شده و یا هرگونه مغایرت و اشتباه مشخص گردد،
                                       مسئولیت هرگونه عواقب ناشی از آن را عهده دار خواهم بود و اینجانب حق هرگونه اعتراضی را از خود سلب می نمایم.
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
