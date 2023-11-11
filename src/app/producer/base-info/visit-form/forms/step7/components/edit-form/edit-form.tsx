import { Col, Form, Row, Select } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React from 'react'

export default function EditForm() {

    const [form] = useForm();

    return (
        <Form form={form} layout="vertical">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="exporter"
                        label="روش شیرین سازی"
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
                <Col xs={24} md={12}>
                    <Form.Item
                        name="Test"
                        label="موارد مورد مصرف"
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
            </Row>
        </Form>
    )
}
