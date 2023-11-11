import { Form, Radio } from 'antd';
import React from 'react'

function CustomRadioGroup(
    { label, value, options, onChange, name, data }:
        { label: string, value: any, options: any, onChange: any, name: string, data?: any }) {
    return (
        <Form.Item
            rules={[{ required: true, message: "این فیلد اجباری است" }]}
            label={label}
            name={name}
        >
            <Radio.Group
                size='large'
                className='w-full my-1'
                defaultValue={data}
                value={value}
                buttonStyle="solid"
                onChange={onChange}
            >
                {options.map((option: any) => (
                    <Radio.Button className='w-1/2' key={option.value} value={option.value}>
                        {option.label}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </Form.Item>
    );
}
export default CustomRadioGroup;