"use client";

import React from "react";
import {Button, Col, Divider, Form, Input, Row, Typography} from "antd";

export default function Page() {
    return (
        <>
            <div className="box-border w-full mt-4 p-6">
                {/*<Spin spinning={isLoading}>*/}
                {/*    <Form disabled={isLoading} form={form} initialValues={data?.data} name="form_item_path"*/}
                {/*          layout="vertical">*/}
                {/*        <Row gutter={[16, 16]}>*/}
                {/*            <Col xs={24} md={12}>*/}
                {/*                <Form.Item name="name" label="نام واحد تولیدی">*/}
                {/*                    <Input disabled size="large"/>*/}
                {/*                </Form.Item>*/}
                {/*            </Col>*/}
                {/*            <Col xs={24} md={12}>*/}
                {/*                <Form.Item name="nationalCode" label="  شناسه ملی">*/}
                {/*                    <Input disabled size="large"/>*/}
                {/*                </Form.Item>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row gutter={[16, 16]}>*/}
                {/*            <Col xs={24} md={12}>*/}
                {/*                <Form.Item name="ceoName" label="نام مدیر عامل">*/}
                {/*                    <Input disabled size="large"/>*/}
                {/*                </Form.Item>*/}
                {/*            </Col>*/}
                {/*            <Col xs={24} md={12}>*/}
                {/*                <Form.Item name="companyOwnershipTypeName" label="   نوع مالکیت">*/}
                {/*                    <Input disabled size="large"/>*/}
                {/*                </Form.Item>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </Form>*/}
                {/*</Spin>*/}
                {/*<Divider/>*/}
                {/*<Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">*/}
                {/*    اطلاعات اعضای هیئت مدیره و مدیرعامل*/}
                {/*</Typography>*/}
                {/*<Table*/}
                {/*    className="mt-8"*/}
                {/*    columns={columns}*/}
                {/*    dataSource={[]}*/}
                {/*    pagination={false}*/}
                {/*/>*/}
                {/*<Divider/>*/}
                {/*<Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">*/}
                {/*    اطلاعات کارکنان*/}
                {/*</Typography>*/}
                {/*<Table*/}
                {/*    className="mt-8"*/}
                {/*    columns={columns2}*/}
                {/*    dataSource={[]}*/}
                {/*    pagination={false}*/}
                {/*/>*/}
                {/*<Divider/>*/}
                {/*<Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">*/}
                {/*    اطلاعات مجوز*/}
                {/*</Typography>*/}
                {/*<Table*/}
                {/*    className="mt-8"*/}
                {/*    columns={columns3}*/}
                {/*    dataSource={[]}*/}
                {/*    pagination={false}*/}
                {/*/>*/}
                {/*<Divider/>*/}
                <Typography className="text-right font-medium text-base">
                    لطفا اطلاعات را با دقت بررسی کرده و سپس در صورت صحیح بودن باقی مراحل را
                    کامل نمایید.
                </Typography>

                <Divider/>

                <Form name="form_item_path" layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="year-establishment" label="نام فاکتور">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="year-establishment" label="نام فاکتور">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور">
                                <Input size="large" disabled defaultValue="mysite"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24}>
                            <Form.Item rules={[{required: true, message: "لطفا فیلد را وارد نمایید"}]}
                                       name="processDescription" label="شرح">
                                <Input.TextArea
                                    maxLength={100}
                                    style={{
                                        height: 120,
                                        resize: "none",
                                    }}
                                    placeholder="وارد کنید"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider/>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <div className="flex gap-4">

                            <Button
                                className="w-full management-info-form-submit btn-filter"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                ثبت
                            </Button>
                            <Button
                                className="w-full"
                                size="large"
                                type="primary"
                                danger
                            >
                                رد درخواست
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}
