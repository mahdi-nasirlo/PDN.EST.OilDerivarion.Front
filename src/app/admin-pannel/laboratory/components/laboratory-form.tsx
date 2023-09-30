
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import React from "react";

export default function LaboratoryForm() {

    return (
        <div>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item name="name" label="نام آزمایشگاه">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="tel" label="شماره ثابت">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item name="license_No" label="مشخصه یکتای جواز">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="license_Expire_Date" label="تاریخ">
                        <Input
                            className="w-full"
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item name="is_Active" label="فعال/غیر فعال">
                        <Select
                            defaultValue={true}
                            options={[
                                { label: "فعال", value: true },
                                { label: "غیر فعال", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={24}>
                    <Form.Item name="address" label="آدرس">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="fax" label="فاکتور آزمون">
                        <Input size="large" placeholder="انتخاب کنید" />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
}
