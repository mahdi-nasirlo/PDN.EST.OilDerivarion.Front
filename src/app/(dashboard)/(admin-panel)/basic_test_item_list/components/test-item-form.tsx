import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react'

export default function TestItemForm({ rules }: any) {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="name"
                        label="نام فاکتور آزمون"
                        rules={[rules]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="measureUid"
                        label="واحد اندازه گیری"
                        rules={[rules]}
                    >
                        <Select
                            // loading={ldMeasure}
                            // showSearch
                            // @ts-ignore
                            // filterOption={filterOption}
                            // options={sortByIndex(Measure, "Name")}
                            // fieldNames={{ value: "Uid", label: "Name" }}
                            size="large"
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[rules]}
                        name="isActive"
                        label="فعال/غیر فعال"
                        initialValue={true}
                    >
                        <Select
                            options={[
                                { label: "فعال", value: true },
                                { label: "غیرفعال", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="testDuration"
                        label="مدت زمان انجام آزمایش (ساعت)"
                        rules={[rules]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}