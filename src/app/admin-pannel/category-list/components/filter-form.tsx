"use client";

import { Button, Col, Form, Row, Select } from 'antd'
import React, { useState } from 'react'

export default function FilterForm() {

    const [selectedDensity, setSelectedDensity] = useState('');

    const handleDensityChange = (value: any) => {
        setSelectedDensity(value);
    };

    return (
        <div className="box-border w-full p-6">
            <Form name="form_item_path" layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year-establishment"
                            label="نام دسته بندی"
                        >
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" label="فعال/غیر فعال">
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="year"
                            label="روش تولید"
                        >
                            <Select size="large" placeholder="انتخاب کنید" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="density" label="دانسیته">
                            <Select size="large" placeholder="انتخاب کنید"
                                onChange={handleDensityChange}>
                                <Select.Option value="yes">دارد</Select.Option>
                                <Select.Option value="no">ندارد</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                {selectedDensity === 'yes' && (
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="establishment"
                                label="میزان دانسیته"
                            >
                                <Select
                                    size="large"
                                    placeholder="انتخاب کنید"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                )}
                <Row dir="ltr">
                    <Col xs={10} md={3} lg={2}>
                        <div className="flex gap-4">
                            <Button
                                className="btn-filter"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                اعمال فیلتر
                            </Button>
                            <Button
                                className="btn-delete-filter"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                حذف فیلتر
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
