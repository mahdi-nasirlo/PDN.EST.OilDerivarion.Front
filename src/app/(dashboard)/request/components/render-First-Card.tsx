import { PlusOutlined } from '@ant-design/icons'
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline'
import { Button, Form, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import React from 'react'

export default function RenderFirstCard() {

    return (
        <>
            <div>افزودن پکیج</div>
            <ArchiveBoxArrowDownIcon className='mx-auto w-[105px] h-[105px]' />
            <Form layout="vertical" className="w-full">
                <Form.Item
                    label="روش تولید"
                    name="Test"
                    rules={[{ required: true, message: 'لطفا مقدار را انتخاب کنید' }]}
                >
                    <Select placeholder="انتخاب کنید" size="large" className="w-full">
                        <Option value="method1">Production Method 1</Option>
                        <Option value="method2">Production Method 2</Option>
                    </Select>
                </Form.Item>
                <Button
                    size="large"
                    htmlType="submit"
                    type="primary"
                    className="w-full flex items-center justify-center"
                    icon={<PlusOutlined width={16} height={16} />}
                >
                    افزودن پکیج
                </Button>
            </Form>
        </>)
}
