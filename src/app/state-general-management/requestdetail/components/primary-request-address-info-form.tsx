"use client";


import {Col, Divider, Form, Input, Row, Typography} from 'antd'
import React from 'react'
import PrimaryRequestsProductionProcessForm
    from "@/app/state-general-management/requestdetail/components/primary-request-production-process-form";

export default function PrimaryRequestAddressInfoForm() {
    return (
        <>

            <Divider/>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                اطلاعات آدرس
            </Typography>
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <Form.Item name="lastName" label="آدرس">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <Form.Item name="lastName" label="نشانی دفتر مرکزی">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label=" تلفن تماس کارخانه">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label=" تلفن دفتر مرکزی">
                            <Input size="large" placeholder="انتخاب کنید"/>
                        </Form.Item>
                    </Col>
                </Row>
                <PrimaryRequestsProductionProcessForm/>


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
