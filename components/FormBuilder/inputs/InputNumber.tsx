import React from 'react';
import {InputNumberProps} from "antd/lib";
import {FormBuilderInputType} from "../index";
import {Rule} from "rc-field-form/es/interface";
import FormItem from "../FormItem";
import {InputNumber as InputNumberAnt} from "antd";


interface PropsType {
    data: FormBuilderInputType
}


const InputNumber = (props: InputNumberProps & PropsType) => {

    const {data} = props

    let rules: Rule[] = [
        {
            required: data?.Is_Required
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
            <InputNumberAnt size="large" {...props} defaultValue={data?.Default_Value}
                            placeholder={data?.Placeholder || "وارد کنید"}
                            className="w-full"/>
        </FormItem>
    );
};

export default InputNumber;