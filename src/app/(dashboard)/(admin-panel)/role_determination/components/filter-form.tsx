"use client";

import { Col, Form, Input, Row } from "antd";
import React from "react";
import ButtonFilter from "@/components/button-filter";
import { useValidation } from "@/hooks/use-validation";
import userRoleStateApi from "../../../../../constance/user-role-state";
import { z } from "zod";

const formSchema = userRoleStateApi.GetUserBySearch.type

interface TProps {
    onFinish: (arg: z.infer<typeof formSchema>) => void
}

export default function FilterForm({ onFinish }: TProps) {

    const [form, rules] = useValidation(formSchema)

    return (
        <Form form={form} onFinish={(values) => onFinish(values)} layout="vertical">
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={8}>
                    <Form.Item rules={[rules]} name="first_Name" label="نام">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item rules={[rules]} name="last_Name" label="نام خانوادگی">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item rules={[rules]} name="national_Code" label="شماره ملی">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
            <ButtonFilter
                unsetFilter={() => {
                    form.resetFields();
                    form.submit()
                }}
                isLoading={false}
            />
        </Form>
    );
}
