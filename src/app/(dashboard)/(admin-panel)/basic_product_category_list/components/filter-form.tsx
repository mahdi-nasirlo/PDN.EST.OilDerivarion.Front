import ButtonFilter from '@/components/button-filter'
import { useValidation } from '@/hooks/use-validation'
import { Col, Form, Input, Row, Select } from 'antd'
import { productCategoryApi } from 'constance/product-category'
import React from 'react'
import { z } from 'zod'


const formSchema = productCategoryApi.BasicProductCategoryGetPage.type

export default function FilterForm({ onFinish }: { onFinish: (arg: z.infer<typeof formSchema>) => void }) {

    const [form, rules] = useValidation(formSchema)

    return (
        <Form form={form} onFinish={(values) => onFinish(values)} layout="vertical">
            <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                    <Form.Item rules={[rules]} name="name" label="نام دسته بندی">
                        <Input size="large" placeholder="انتخاب کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
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
                <Col xs={24} md={12}>
                    <Form.Item rules={[rules]} name="hasDensity" label="دانسیته">
                        <Select
                            size="large"
                            placeholder="انتخاب کنید"
                            options={[
                                { label: "دارد", value: true },
                                { label: "ندارد", value: false },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item rules={[rules]} name="densityTypeId" label="بازه دانسیته">
                        <Select
                            showSearch
                            // @ts-ignore
                            // filterOption={filterOption}
                            // loading={ldGetAllDensityType}
                            // options={sortByIndex(GetAllDensityType, "Name")}
                            // fieldNames={{ value: "Id", label: "Name" }}
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
