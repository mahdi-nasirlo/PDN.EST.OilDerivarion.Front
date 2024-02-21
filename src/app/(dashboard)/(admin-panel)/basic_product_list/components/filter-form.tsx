import ButtonFilter from '@/components/button-filter'
import { useProductCategoryList } from '@/hooks/basic/product-category/use-product-category-list'
import { useValidation } from '@/hooks/use-validation'
import { filterOption } from '@/lib/filterOption'
import { Col, Form, Input, Row, Select } from 'antd'
import { productApi } from 'constance/product'
import React from 'react'
import { z } from 'zod'

const formSchema = productApi.BasicProductGetPage.type

interface TProps {
    onFinish: (arg: z.infer<typeof formSchema>) => void
}

export default function FilterForm({ onFinish }: TProps) {

    const [form, rules] = useValidation(formSchema)

    const productCategory = useProductCategoryList()

    return (
        <Form form={form} onFinish={(values) => onFinish(values)} layout="vertical">
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={12}>
                    <Form.Item rules={[rules]} name="name" label="نام محصول">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item rules={[rules]} name="productCategoryUid" label="نام دسته بندی">
                        <Select
                            showSearch
                            size="large"
                            placeholder="انتخاب کنید"
                            filterOption={filterOption}
                            loading={productCategory.isLoading}
                            options={productCategory.options}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={12}>
                    <Form.Item rules={[rules]} name="isActive" label="فعال/غیر فعال">
                        <Select
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
