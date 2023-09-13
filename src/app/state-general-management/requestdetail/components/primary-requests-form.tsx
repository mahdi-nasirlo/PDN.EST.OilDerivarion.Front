"use client";


import {Col, Divider, Form, Input, Row, Typography} from 'antd'
import React from 'react'
import PrimaryRequestsManagerTable
    from "@/app/state-general-management/requestdetail/components/primary-request-manager-table";

export default function PrimaryRequestsListForm() {
    return (
        <div className="box-border w-full p-6">
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت بررسی و سپس گزارش خود را ارسال نمایید.
            </Typography>
            <Divider/>
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نام واحد تولیدی">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="کد ملی / کد اتباع">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="نوع مالکیت">
                            <Input size="large" placeholder="وارد کنید"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="تعداد کارکنان تولیدی (بر حسب نفر)">
                            <Input size="large" placeholder="انتخاب کنید"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider/>
                <PrimaryRequestsManagerTable/>


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
        </div>
    )
}