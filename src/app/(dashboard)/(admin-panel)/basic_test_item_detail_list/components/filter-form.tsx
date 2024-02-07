import ButtonFilter from '@/components/button-filter'
import { useValidation } from '@/hooks/use-validation'
import { Col, Form, Input, Row, Select } from 'antd'
import { TestItemDetailApi } from 'constance/test-item-detail'
import React from 'react'
import { z } from 'zod'

const formSchema = TestItemDetailApi.BasicTestItemDetailGetPage.type

interface TProps {
    onFinish: (arg: z.infer<typeof formSchema>) => void
}

export default function FilterForm({ onFinish }: TProps) {

    const [form, rules] = useValidation(formSchema);

    return (
        <Form onFinish={(values) => onFinish(values)} form={form} layout="vertical">
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={12}>
                    <Form.Item rules={[rules]} name="title" label="عنوان استاندارد">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item rules={[rules]} name="isActive" label="فعال / غیر فعال">
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
