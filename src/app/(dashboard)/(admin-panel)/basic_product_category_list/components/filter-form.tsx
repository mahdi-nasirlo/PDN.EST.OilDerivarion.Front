import ButtonFilter from '@/components/button-filter'
import { useValidation } from '@/hooks/use-validation'
import { Col, Form, Input, Row, Select } from 'antd'
import { productCategoryApi } from 'constance/product-category'
import React, { useState } from 'react'
import { z } from 'zod'
const formSchema = productCategoryApi.BasicProductCategoryGetPage.type

interface TProps {
    onFinish: (arg: z.infer<typeof formSchema>) => void
}

export default function FilterForm({ onFinish }: TProps) {

    const [form, rules] = useValidation(formSchema)

    const [hasDensityFormItem, setHasDensityFormItem] = useState<boolean>(false)

    return (
        <Form form={form} onFinish={(values) => onFinish(values)} layout="vertical">
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={12}>
                    <Form.Item rules={[rules]} name="name" label="نام دسته بندی">
                        <Input size="large" placeholder="انتخاب کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item rules={[rules]} name="isActive" label="فعال/غیر فعال">
                        <Select
                            size="large"
                            placeholder="انتخاب کنید"
                            options={[
                                { label: "فعال", value: true },
                                { label: "غیرفعال", value: false },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={12}>
                    <Form.Item rules={[rules]} name="hasDensity" label="دانسیته">
                        <Select
                            size="large"
                            placeholder="انتخاب کنید"
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                            onChange={(value) => {
                                console.log(value);

                                if (value == false) {
                                    setHasDensityFormItem(true);
                                    form.setFieldsValue({ densityTypeId: undefined });
                                } else
                                    setHasDensityFormItem(false);
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        rules={[rules]}
                        name="densityTypeId"
                        label="بازه دانسیته"
                    >
                        <Select
                            disabled={hasDensityFormItem}
                            options={[
                                { label: "بالاتر  از 900", value: 2 },
                                { label: "پایین تر  از 900", value: 1 }
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <ButtonFilter
                unsetFilter={() => {
                    form.resetFields();
                    form.submit()
                }}
                isLoading={false}
            />
        </Form>
    )
}
