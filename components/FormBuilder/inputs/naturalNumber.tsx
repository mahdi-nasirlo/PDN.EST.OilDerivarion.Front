import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';
import { FormBuilderInputType } from '../index';
import { Rule } from 'rc-field-form/es/interface';
import FormItem from '../FormItem';

interface PropsType {
    data: FormBuilderInputType;
}

const NaturalNumber: React.FC<InputNumberProps & PropsType> = ({ data, ...props }) => {

    const rules: Rule[] = [

        // فقط اعداد صحیح و مثبت
        {
            required: true,
            message: 'لطفاً مقدار را وارد کنید',
        },
        {
            pattern: /^(?!-)\d+(\.\d+)?$/,
            message: 'لطفاً عدد وارد کنید',
        },
        {
            type: "integer",
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
                placeholder='وارد کنید'
                defaultValue={data?.Default_Value as any}
                {...props}
            />
        </FormItem>
    );
};

export default NaturalNumber;
