"use client";


import {Col, Divider, Form, Input, Row, Typography} from 'antd'
import React from 'react'

export default function PrimaryRequestLicenseInfoForm() {
    return (
        <>

            <Divider/>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                اطلاعات مجوز
            </Typography>
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="سال تاسیس">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام شرکت ثبت شده">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="شماره ثبت شرکت">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label=" شماره پروانه بهره برداری / جواز تاسیس">
                            <Input size="large" placeholder="انتخاب کنید"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label=" تاریخ صدور پروانه بهره برداری / جواز تاسیس">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label=" شناسه کسب و کار">
                            <Input size="large" placeholder="انتخاب کنید"/>
                        </Form.Item>
                    </Col>
                </Row>
                {/*<PrimaryRequestAddressInfoForm/>*/}

                {/*<Row dir="ltr">*/}
                {/*    <Col xs={10} md={3} lg={2}>*/}
                {/*        <div className="flex gap-4">*/}
                {/*            <Button*/}
                {/*                className="w-full bg-green-500"*/}
                {/*                size="large"*/}
                {/*                type="primary"*/}
                {/*            >*/}
                {/*                <span className="flex gap-2 justify-center ">خروجی اکسل</span>*/}
                {/*            </Button>*/}
                {/*            <Button*/}
                {/*                className="btn-filter"*/}
                {/*                size="large"*/}
                {/*                type="primary"*/}
                {/*                htmlType="submit"*/}
                {/*            >*/}
                {/*                اعمال فیلتر*/}
                {/*            </Button>*/}
                {/*            <Button*/}
                {/*                className="btn-delete-filter"*/}
                {/*                size="large"*/}
                {/*                type="primary"*/}
                {/*                htmlType="submit"*/}
                {/*            >*/}
                {/*                حذف فیلتر*/}
                {/*            </Button>*/}
                {/*        </div>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </Form>
        </>

    )
}
