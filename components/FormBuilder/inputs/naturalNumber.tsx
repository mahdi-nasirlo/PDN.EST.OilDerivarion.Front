import React from 'react';
import { Input, InputProps } from 'antd';
import { FormBuilderInputType } from '../index';
import { Rule } from 'rc-field-form/es/interface';
import FormItem from '../FormItem';

interface PropsType {
    data: FormBuilderInputType;
}

const NaturalNumber: React.FC<InputProps & PropsType> = ({ data, ...props }) => {

    const rules: Rule[] = [

        // فقط اعداد صحیح و مثبت
        {
            required: true,
            message: 'لطفاً مقدار را وارد کنید',
        },
        {
            pattern: /^(?!-)(0|[1-9]\d*)?$/,
            message: 'لطفاً عدد صحیح وارد کنید',
        },
        // {
        //     pattern: /^(?!-)\d+$/,
        //     message: 'لطفاً عدد صحیح وارد کنید',
        // },
    ];


    return (
        <FormItem
            name={data.Name}
            label={data?.Title_Style}
            rules={rules}
        >
            <Input
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
