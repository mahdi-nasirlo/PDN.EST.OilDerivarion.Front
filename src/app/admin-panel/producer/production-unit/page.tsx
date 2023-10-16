"use client";

import { Button, Col, Divider, Form, Input, Row, Select, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import { mutationFetcher } from '../../../../../lib/server/mutationFetcher';
import { SetBase } from '../../../../../interfaces/Base-info';
import { listFetcher } from '../../../../../lib/server/listFetcher';
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

export default function Page() {

    const [form] = useForm();

    const { trigger, isMutating } = useSWRMutation("/Producer/SetBase", mutationFetcher)

    const onFinish = async (values: SetBase) => {

        await trigger(values)

        form.resetFields();

    };

    const { data: CompanyOwnershipTypeGetAll, isLoading: ldCompanyOwnership } = useSWR(
        ["/BaseInfo/CompanyOwnershipTypeGetAll", {
            name: null,
            isActive: null
        }],
        ([url, arg]: [string, any]) => listFetcher(url, { arg }))


    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider />
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="currentCEOName"
                            label="نام مدیر عامل"
                            rules={[
                                {
                                    required: true,
                                    message: "این فیلد اجباری است",
                                },
                            ]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="currentCEOLastName"
                            label="نام خانوادگی مدیر عامل"
                            rules={[
                                {
                                    required: true,
                                    message: "این فیلد اجباری است",
                                },
                            ]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="currentCEONationalCode"
                            label="شناسه ملی"
                            rules={[
                                { required: true, message: "کد ملی اجباری است" },
                                {
                                    validator: (_, value) => {
                                        if (!value || value.length === 10) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("کد ملی باید ۱۰ رقم باشد");
                                    },
                                },
                            ]}
                        >
                            <Input size="large" className="w-full rounded-lg" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="name"
                            label="نام واحد تولیدی"
                            rules={[
                                {
                                    required: true,
                                    message: "این فیلد اجباری است"
                                },
                            ]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="companyOwnershipTypeId"
                            label="نوع مالکیت"
                            rules={[
                                {
                                    required: true,
                                    message: "این فیلد اجباری است"
                                },
                            ]}
                        >
                            <Select
                                loading={ldCompanyOwnership}
                                options={CompanyOwnershipTypeGetAll}
                                fieldNames={{ value: "Id", label: "Name" }}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <div className="flex gap-6">
                    <Button
                        loading={isMutating}
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        <span className="flex gap-2 justify-center "> ثبت</span>
                    </Button>
                </div>
            </Form>
        </>
    )
}
