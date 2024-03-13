import React from 'react'
import { useMeasureList } from '@/hooks/basic/measure/use-measure-list';
import { filterOption } from '@/lib/filterOption';
import { Col, Form, Input, InputNumber, Row, Select } from 'antd';

export default function TestItemForm({ rules }: any) {

    const measure = useMeasureList()

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="name"
                        label="نام فاکتور آزمون"
                        rules={[rules]}
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="measureUid"
                        label="واحد اندازه گیری"
                        rules={[rules]}
                    >
                        <Select
                            showSearch
                            size="large"
                            placeholder="وارد کنید"
                            filterOption={filterOption}
                            loading={measure.isLoading}
                            options={measure.options}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        rules={[rules]}
                        name="isActive"
                        label="فعال/غیرفعال"
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
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="testDuration"
                        label="مدت زمان انجام آزمایش (ساعت)"
                        rules={[rules]}
                    >
                        <InputNumber
                            maxLength={9}
                            className='w-full'
                            controls={false}
                            size="large"
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        rules={[rules]}
                        name="result_Type"
                        label="ثبت نتیجه"
                        initialValue={1}
                    >
                        <Select
                            options={[
                                { label: "بازه عددی", value: 2 },
                                { label: "توضیحات متنی", value: 1 },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        rules={[rules]}
                        name="need_Process"
                        label="انجام محاسبه آزمایش"
                        initialValue={false}
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>

        </>
    )
}
