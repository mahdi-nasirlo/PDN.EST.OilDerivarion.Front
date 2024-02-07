import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Rule } from "rc-field-form/es/interface";

export default function ProductCategoryForm({ rules, density }: { rules: Rule, density?: boolean }) {

    const [hasDensity, setHasDensity] = useState(density ?? true);

    useEffect(() => {
        setHasDensity(density ?? false)
    }, [density])

    const productMethods = [
        { value: 1, label: "برش" },
        { value: 2, label: "بلندینگ" },
        { value: 3, label: "پیرولیز" },
        { value: 4, label: "کرکینگ" },
        { value: 5, label: "شیرین سازی" },
    ];

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        name="name"
                        label="نام دسته بندی"
                        rules={[rules]}
                    >
                        <Input className='w-full' size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
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
                <Col xs={24} sm={12}>
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
                <Col xs={24} sm={12}>
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
                    <Col xs={24} sm={12}>
                        <Form.Item
                            required={false}
                            rules={[
                                { required: true, message: "لطفا مقدار را وارد کنید" },
                                {
                                    validator(_, value) {
                                        const isInteger = Number.isInteger(parseFloat(value));
                                        if (isNaN(value) || !isInteger || value < 0) {
                                            const errorMessage = isInteger ? "لطفاً عدد مثبت وارد کنید" : "لطفاً عدد وارد کنید";
                                            return Promise.reject(new Error(errorMessage));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
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
                    <Col xs={24} sm={12}>
                        <Form.Item
                            required={false}
                            rules={[
                                { required: true, message: "لطفا مقدار را وارد کنید" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (isNaN(value) || !Number.isInteger(parseFloat(value))) {
                                            return Promise.reject(
                                                new Error("لطفاً عدد مثبت وارد کنید")
                                            );
                                        }
                                        if (parseInt(value) > getFieldValue("densityLowerLimit")) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject(
                                                new Error(
                                                    "حداکثر بازه نمی‌تواند از حداقل بازه کمتر باشد"
                                                )
                                            );
                                        }
                                    },
                                }),
                            ]}
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
                <Col xs={24} sm={12}>
                    <Form.Item
                        required={false}
                        name="smallCode"
                        label="کد"
                        rules={[
                            { required: true, message: "لطفا مقدار را وارد کنید" },
                            {
                                validator(_, value) {
                                    const numericValue = parseFloat(value);
                                    if (isNaN(numericValue) || !Number.isInteger(numericValue)) {
                                        return Promise.reject(
                                            new Error("لطفاً عدد مثبت وارد کنید")
                                        );
                                    }
                                    if (numericValue > 100) {
                                        return Promise.reject(
                                            new Error("حداکثر تعداد مجاز دو کاراکتر است")
                                        )
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
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
