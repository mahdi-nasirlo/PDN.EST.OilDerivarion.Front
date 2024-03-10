import React from 'react';
import { InputProps } from "antd/lib";
import { FormBuilderInputType } from "../index";
import { Input } from "antd";
import FormItem from "../FormItem";
import { Rule } from "rc-field-form/es/interface";


interface PropsType {
    data: FormBuilderInputType
}

const TextInput = (props: InputProps & PropsType) => {

    const { data } = props

    const rules: Rule[] = [
        {
            required: data.Is_Required,
            message: 'لطفا مقدار را وارد کنید'
        }
    ]

    return (
        <FormItem
            name={data.Name}
            label={data?.Title_Style}
            rules={rules}
        >
            <Input size='large' {...props} defaultValue={data?.Default_Value} />
        </FormItem>
    );
};

export default TextInput;