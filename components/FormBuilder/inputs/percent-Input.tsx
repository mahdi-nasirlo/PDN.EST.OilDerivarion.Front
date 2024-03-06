import React from 'react';
import { Input, InputNumber, InputNumberProps } from 'antd';
import { FormBuilderInputType } from '../index';
import { Rule } from 'rc-field-form/es/interface';
import FormItem from '../FormItem';
import { InputProps } from 'antd/lib';

interface PropsType {
    data: FormBuilderInputType;
}

const PercentInput: React.FC<InputNumberProps & PropsType> = ({ data, ...props }) => {

    const rules: Rule[] = [

        //فقط اعداد اعشاری و مثبت بین 0 تا 100
        {
            required: true,
            message: 'لطفاً مقدار را وارد کنید',
        },
        {
            pattern: /^(?!-)(0|[1-9]\d*)(\.\d+)?$/,
            message: 'لطفاً عدد صحیح وارد کنید',
        },
    ];

    return (
        <FormItem
            name={data.Name}
            label={data?.Title_Style}
            rules={rules}
        >
            <InputNumber
                max={100}
                maxLength={15}
                size="large"
                className="w-full"
                controls={false}
                formatter={(value) => `${value}%`}
                placeholder='وارد کنید'
                defaultValue={data?.Default_Value as any}
                {...props}
            />
        </FormItem>
    );
};

export default PercentInput;
