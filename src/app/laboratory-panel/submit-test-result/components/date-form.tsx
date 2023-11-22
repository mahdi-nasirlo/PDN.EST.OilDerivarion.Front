"use client";

import {Button, Col, Form, Row} from "antd";
import React from "react";
import {useForm} from "antd/es/form/Form";
import {SvgIcon} from "@/components/layout/sidebar";
import CustomeDatePicker from "../../../../../components/CustomeDatePicker";

export default function DateForm() {
    const [form] = useForm();

    return (
        <Form form={form} layout="vertical">
            <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                    <Form.Item name="name" label="تاریخ شروع آزمایش">
                        <CustomeDatePicker/> </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="IsActive" label="تاریخ پایان آزمایش">
                        <CustomeDatePicker/>
                    </Form.Item>
                </Col>
            </Row>
            <Row dir="ltr">
                <Col xs={10} md={3} lg={2}>

                    <Button
                        loading={false}
                        htmlType="submit"
                        className="w-full management-info-form-submit"
                        size="large"
                        type="primary"
                    >
              <span
                  style={{display: "flex"}}
                  className="flex gap-2 justify-center"
              >
                ذخیره
                <SvgIcon src="/static/save.svg"/>
              </span>
                    </Button>
                </Col>

            </Row>


        </Form>
        // </div>
    );
}
