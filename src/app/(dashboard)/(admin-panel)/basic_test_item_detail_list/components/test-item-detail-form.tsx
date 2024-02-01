import { Col, Form, Input, Row, Select } from 'antd'
import React from 'react'

export default function TestItemDetailForm({ rules }: any) {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="title"
                        label="عنوان استاندارد"
                        rules={[rules]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="referenceCode"
                        label="شناسه استاندارد"
                        rules={[rules]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="isActive"
                        label="فعال / غیر فعال"
                        rules={[rules]}
                        initialValue={true}
                    >
                        <Select
                            size="large"
                            options={[
                                { label: "فعال", value: true },
                                { label: "غیر فعال", value: false },
                            ]}
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="testItemUid"
                        label="فاکتور آزمون"
                        rules={[rules]}
                    >
                        <Select
                            showSearch
                            // @ts-ignore
                            // filterOption={filterOption}
                            // options={sortByIndex(data, "name")}
                            // loading={isLoading}
                            // fieldNames={{ value: "uid", label: "name" }}
                            size="large"
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>            </Row>
        </>
    )
}
