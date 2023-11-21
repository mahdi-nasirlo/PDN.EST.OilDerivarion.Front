import React from 'react';
import {InputProps, SelectProps} from "antd/lib";
import {FormBuilderInputType} from "../index";
import {Rule} from "rc-field-form/es/interface";
import FormItem from "../FormItem";
import {Select as AntSelect} from "antd";

interface PropsType {
    data: FormBuilderInputType
}


const Select = (props: InputProps & PropsType) => {

    if (!props.data) return "select no data"

    const {data} = props

    let Is_Required = data?.Is_Required ? data.Is_Required : false

    const rules: Rule[] = [
        {
            required: Is_Required
        }
    ]

    const options: SelectProps["options"] = data?.FormFieldDetails?.map((value, index) => ({
        value: value.Value,
        label: value.Text
    }))

    return (
        <FormItem
            name={data.Form_Field_ID}
            label={data?.Title_Style}
            rules={rules}
        >
            <AntSelect options={options} size="large" {...props as any} />
        </FormItem>
    );
};

export default Select;