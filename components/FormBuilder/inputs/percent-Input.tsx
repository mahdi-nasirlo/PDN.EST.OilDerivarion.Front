import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';
import { FormBuilderInputType } from '../index';
import { Rule } from 'rc-field-form/es/interface';
import FormItem from '../FormItem';

interface PropsType {
    data: FormBuilderInputType;
}

const PercentInput: React.FC<InputNumberProps & PropsType> = ({ data, ...props }) => {

    const rules: Rule[] = [
        {
            required: true,
            message: 'لطفاً مقدار را وارد کنید',
        },
        {
            type: "number",
            message: 'لطفاً عدد وارد کنید',
        },
        {
            min: 0,
            max: 100,
            message: "لطفاً مقداری بین 0 تا ۱۰۰ وارد کنید",
        },
    ];

    return (
        <FormItem
            name={data.Name}
            label={data?.Title_Style}
            rules={rules}
        >
            <InputNumber
                min={0}
                max={100}
                className="w-full"
                size="large"
                formatter={(value) => `%${value}`}
                placeholder='وارد کنید'
                defaultValue={data?.Default_Value as any}
                {...props}
            />
        </FormItem>
    );
};

export default PercentInput;
