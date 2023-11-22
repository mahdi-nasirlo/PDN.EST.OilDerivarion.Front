import { Form, Input } from 'antd'
import React from 'react'

export default function ReceivePasswordForm(
    {
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
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
            >
                <Input size='large' placeholder='وارد کنید' />
            </Form.Item>
        </Form>
    )
}
