import ButtonFilter from '@/components/button-filter'
import { useValidation } from '@/hooks/use-validation'
import { Col, Form, Input, Row, Select } from 'antd'
import { TestItemDetailApi } from 'constance/test-item-detail'
import React from 'react'
import { z } from 'zod'

const formSchema = TestItemDetailApi.BasicTestItemDetailGetPage.type

export default function FilterForm({ onFinish }: { onFinish: (arg: z.infer<typeof formSchema>) => void }) {

    const [form, rules] = useValidation(formSchema);

    return (
        <Form onFinish={(values) => onFinish(values)} form={form} layout="vertical">
            <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                    <Form.Item rules={[rules]} name="title" label="عنوان استاندارد">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
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
