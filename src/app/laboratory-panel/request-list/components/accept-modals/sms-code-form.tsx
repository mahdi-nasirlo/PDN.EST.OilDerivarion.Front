import { Form, Input } from 'antd'
import React from 'react'

export default function SmsCodeForm({
    form,
    onFinish,
}: {
    form: any;
    onFinish: any;
}) {
    return (
        <Form form={form} layout='vertical' onFinish={onFinish}>
            <Form.Item

                label="شناسه جعبه"
                name="barcode"
            >
                <Input disabled size='large' placeholder='وارد کنید' />
            </Form.Item>
            <Form.Item
                label="رمز عبور"
                name="pass"
            >
                <Input size='large' placeholder='وارد کنید' />
            </Form.Item>
        </Form>
    )
}
