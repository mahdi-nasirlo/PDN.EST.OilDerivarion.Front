"use client"

import { SvgIcon } from '@/components/layout/sidebar';
import { Button, Col, Form, Input, Radio, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import FormBuilder from '../../../../../../../../components/FormBuilder';
import useSWR from 'swr';
import { listFetcher } from '../../../../../../../../lib/server/listFetcher';
import FormBuilderFetcher from '../../../../../../../../lib/server/formBuilderFetcher';

export default function CreateModal() {


    const { data, isLoading: loadingForm } = useSWR("/CategoryForm/GetData",

        ([url, arg]: [string, any]) => FormBuilderFetcher(url, {
            arg: {
                group_ID: "31aefbf6-0e08-4044-8132-b3226253054f",
                groupKey: null,
                category_ID: "43ed033a-e22d-4ad8-975a-2978db10b6db",
                category_Key: null
            }
        })
    )

    return (
        <>
            <FormBuilder items={data?.data as any} loading={loadingForm} />
            {/* <Form
                form={form}
                layout="vertical"
                initialValues={{ licenseType: false }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="exporter"
                            label="شکل مخزن"
                            rules={[{ required: true }]}
                        >
                            <Select
                                // loading={ldLicenseTypeGetAll}
                                // options={LicenseTypeGetAll}
                                // fieldNames={{ value: "Id", label: "Name" }}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="issueDatePersian"
                            label="ارتفاع (متر)"
                            rules={[{ required: true }]}
                        >
                            <Input
                                className="w-full rounded-lg"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="expirationDatePersian"
                            label="محیط (متر)"
                            rules={[{ required: true }]}
                        >
                            <Input
                                className="w-full rounded-lg"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="name"
                            label="حجم (متر مکعب)"
                            rules={[
                                { required: true, message: "این فیلد اجباری است" },
                                { type: "string", message: "باید به صورت متن باشد" },
                            ]}
                        >
                            <Select
                                // loading={ldLicenseTypeGetAll}
                                // options={LicenseTypeGetAll}
                                // fieldNames={{ value: "Id", label: "Name" }}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="number"
                            label="لوله خروجی مخزن (اینچ)"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="licenseTypeId"
                            label="الکترو پمپ لوله خروجی(اسب بخار)"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="name"
                            label="دبی ورودی"
                            rules={[
                                { required: true, message: "این فیلد اجباری است" },
                                { type: "string", message: "باید به صورت متن باشد" },
                            ]}
                        >
                            <Select
                                // loading={ldLicenseTypeGetAll}
                                // options={LicenseTypeGetAll}
                                // fieldNames={{ value: "Id", label: "Name" }}
                                size="large"
                                placeholder="انتخاب کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="number"
                            label="دبی خروجی"
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                        >
                            <Input size="large" placeholder="وارد کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            rules={[{ required: true, message: "این فیلد اجباری است" }]}
                            label="تاییدیه کارگروه استاندارد سازی"
                            name="licenseType"
                        >
                            <Radio.Group
                                size='large'
                                defaultValue={false}
                                className='w-full my-1 text-center'
                                value={form.getFieldValue("licenseType")}
                                buttonStyle="solid"
                                onChange={(e: any) => form.setFieldsValue({ licenseType: e.target.value })}
                            >
                                <Radio.Button value={true} className='w-1/2'>دارد</Radio.Button>
                                <Radio.Button value={false} className='w-1/2'>ندارد</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row dir="ltr">
                    <Col xs={10} md={3} lg={2}>
                        <Button
                            // loading={isMutating}
                            htmlType="submit"
                            className="w-full management-info-form-submit"
                            size="large"
                            type="primary"
                        >
                            <span
                                style={{ display: "flex" }}
                                className="flex gap-2 justify-center"
                            >
                                ذخیره
                                <SvgIcon src="/static/save.svg" />
                            </span>
                        </Button>
                    </Col>
                </Row>
            </Form> */}
        </>
    )
}
