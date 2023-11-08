import { SvgIcon } from '@/components/layout/sidebar';
import { Button, Col, Form, Input, Radio, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function CreateForm() {

    const [form] = useForm();

    return (
        <>
            <Form
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
            </Form>
        </>
    )
}
