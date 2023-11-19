import React from 'react';
import {InputProps} from "antd/lib";
import {FormBuilderInputType} from "../index";
import {Input} from "antd";
import FormItem from "../FormItem";
import {Rule} from "rc-field-form/es/interface";


interface PropsType {
    data: FormBuilderInputType
}

const TextInput = (props: InputProps & PropsType) => {

    const {data} = props

    const rules: Rule[] = [
        {
            required: data.Is_Required
        }
    ]

    return (
        <FormItem
            name={data.Form_Field_ID}
            label={data?.Title_Style}
            rules={rules}
        >
            <Input {...props} defaultValue={data?.Default_Value}/>
        </FormItem>
    );
};

export default TextInput;