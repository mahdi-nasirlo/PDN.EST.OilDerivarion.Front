import { useMeasureList } from '@/hooks/basic/measure/use-measure-list';
import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import React from 'react'

export default function TestItemForm({ rules }: any) {

    const measure = useMeasureList()

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
                            showSearch
                            loading={measure.isLoading}
                            options={measure.options}
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
                        <InputNumber
                            className='w-full'
                            controls={false}
                            size="large"
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}
