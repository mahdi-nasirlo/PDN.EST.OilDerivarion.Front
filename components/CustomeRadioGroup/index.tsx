import { Form, Radio } from 'antd';
import React from 'react'

function CustomRadioGroup(
    { label, value, options, onChange, name, data }:
        { label: string, value: any, options: any, onChange: any, name: string, data?: any }) {

    const fieldDetailLen = options?.data?.FormFieldDetails?.length
    const widthPercent = fieldDetailLen ? 100 / fieldDetailLen : 100

    return (
        <Form.Item
            rules={[{ required: true, message: "لطفا انتخاب کنید" }]}
            label={label}
            name={name}
        >
            <Radio.Group
                size='large'
                className='w-full my-1 flex'
                defaultValue={data}
                value={value}
                buttonStyle="solid"
                onChange={onChange}
            >
                {options.map((option: any) => (
                    <Radio.Button
                        key={option.value}
                        value={option.value}
                        className='flex items-center justify-center'
                        style={{ width: `${widthPercent}%` }}
                    >
                        {option.label}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </Form.Item>
    );
}
export default CustomRadioGroup;