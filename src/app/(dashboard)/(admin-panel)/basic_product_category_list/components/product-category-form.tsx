import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import React, { useState } from 'react'

export default function ProductCategoryForm({ rules }: any) {

    const [hasDensity, setHasDensity] = useState(true);

    const productMethods = [
        { value: 1, label: "برش" },
        { value: 2, label: "بلندینگ" },
        { value: 3, label: "پیرولیز" },
        { value: 4, label: "شیرین سازی" },
        { value: 5, label: "کرکینگ" },
    ];

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="name"
                        label="نام دسته بندی"
                        rules={[rules]}
                    >
                        <Input className='w-full' size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="productionMethodId"
                        label="روش تولید"
                        rules={[rules]}
                    >
                        <Select
                            options={productMethods}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
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
                        name="hasDensity"
                        label="دانسیته"
                        rules={[rules]}
                    >
                        <Select
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                            onChange={value => setHasDensity(value)}
                        />
                    </Form.Item>
                </Col>
            </Row>
            {hasDensity && (
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            rules={[rules]}
                            name="densityLowerLimit"
                            label="حداقل بازه"
                        >
                            <InputNumber
                                controls={false}
                                className="w-full"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            rules={[rules]}
                            name="densityUpperLimit"
                            label="حداکثر بازه"
                        >
                            <InputNumber
                                controls={false}
                                className="w-full"
                                size="large"
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            )}
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="smallCode"
                        label="کد"
                        rules={[rules]}
                    >
                        <InputNumber
                            controls={false}
                            className="w-full"
                            size="large"
                            placeholder="وارد کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}
