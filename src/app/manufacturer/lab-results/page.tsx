"use client";

import React from "react";
import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";

export default function Page() {
    return (
        <>
            <div className="box-border w-full mt-4 p-6">
                <Typography className="text-right font-medium text-base">
                    لطفا اطلاعات را با دقت بررسی کرده و سپس در صورت صحیح بودن باقی مراحل را
                    کامل نمایید.
                </Typography>
                <Divider />
                <Form name="form_item_path" layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="lastName" label="نام فاکتور آزمون">
                                <Input size="large" disabled defaultValue="mysite" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24}>
                            <Form.Item rules={[{ required: true, message: "لطفا فیلد را وارد نمایید" }]}
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
                <Divider />
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
