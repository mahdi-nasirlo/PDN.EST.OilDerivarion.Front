import React from 'react';
import { InputProps } from "antd/lib";
import { FormBuilderInputType } from "../index";
import { Rule } from "rc-field-form/es/interface";
import FormItem from "../FormItem";
import { Input } from "antd";


interface PropsType {
    data: FormBuilderInputType
}


const InputNumber = (props: InputProps & PropsType) => {

    const { data } = props

    let rules: Rule[] = [
        {
            required: true,
            message: 'لطفا مقدار را وارد کنید'
        },
        {
            type: "number",
            message: 'لطفا عدد وارد کنید',
        }
    ]

    const prepareRule = () => {

        // if (data?.Max_Value)
        //     rules.push({max: data?.Max_Value})
        //
        // if (data?.Min_Value)
        //     rules.push({min: data?.Min_Value})
        //
        return rules
    }

    return (
        <FormItem
            name={data.Name}
            label={data?.Title_Style}
            rules={prepareRule()}
        >
            <Input
                className="w-full"
                size="large"
                type="text"
                defaultValue={data?.Default_Value as any}
                placeholder={data?.Placeholder || "وارد کنید"}
                {...props}
            />
        </FormItem>
    );
};

export default InputNumber;