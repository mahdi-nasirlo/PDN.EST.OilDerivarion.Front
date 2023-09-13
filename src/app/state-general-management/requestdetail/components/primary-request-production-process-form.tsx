"use client";


import {Button, Col, Divider, Form, Input, Row, Typography, Upload} from 'antd';
import React from 'react'
import {UploadOutlined} from "@ant-design/icons";
import PrimaryRequestsLaboratoryEquipmentTable
    from "@/app/state-general-management/requestdetail/components/priamry-request-laboratory-equipment-table";


export default function PrimaryRequestsManagerTable() {
    return (
        <>
            <Divider/>
            <Typography className="mt-3 mb-6 text-right font-medium text-base text-secondary-500 text-secondary">
                فرآیند تولید
            </Typography>
            <Form

                name="form_item_path"
                layout="vertical"
            >
                <Row gutter={32}>
                    <Col span={24}>
                        <Form.Item rules={[{required: true, message: "لطفا فیلد را وارد نمایید"}]}
                                   name="processDescription" label="شرح فرآیند تولید">
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
                <Row className="mt-3" gutter={32}>
                    <Col span={24}>
                        <Form.Item name="fileName" label="نمودار شماتیک فرآیند">
                            <Upload
                                multiple={false}
                                maxCount={1}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture"
                                className="w-full"
                            >
                                <Button icon={<UploadOutlined/>}>بارگزاری نمایید</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <PrimaryRequestsLaboratoryEquipmentTable/>
        </>
    );
}

