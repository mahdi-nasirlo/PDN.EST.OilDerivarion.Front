import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'


interface TProps {
    package_UID: string
}

export default function BoxPostage({ package_UID }: TProps) {
    return (
        <Form>
            <Row gutter={[16, 0]}>
                <Col xs={24} sm={16}>
                    <Form.Item
                        required={false}
                        name={"BoxPostage"}
                        label="هزینه پست (ریال)"
                        labelCol={{ style: { marginTop: "6px" } }}
                        rules={[
                            { required: true, message: "لطفا مقدار را وارد کنید" },
                            { type: 'number', message: "مقدار عددی باشد" }
                        ]}
                    >
                        <Input size='large' placeholder='وارد کنید' />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Button
                        className='w-full'
                        type='primary'
                        htmlType='submit'
                        size='large'
                    >
                        ارسال برای متقاضی
                    </Button>
                </Col>
            </Row>
        </Form >
    )
}
