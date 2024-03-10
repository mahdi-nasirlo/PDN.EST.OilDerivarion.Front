import React from 'react';
import { FormBuilderInputType } from "../index";
import { RadioButtonProps } from "antd/lib/radio/radioButton";
import FormItem from "../FormItem";
import { Radio } from "antd";
import { Rule } from "rc-field-form/es/interface";

interface PropsType {
    data: FormBuilderInputType
}


const RadioBtn = (props: RadioButtonProps & PropsType) => {

    const data = props?.data

    const rules: Rule[] = [
        {
            required: true,
            message: 'لطفا انتخاب کنید'
        }
    ]

    let defaultValue = null

    if (Array.isArray(props?.data?.FormFieldDetails) && props?.data?.FormFieldDetails[0]) {
        defaultValue = props?.data?.FormFieldDetails[0].Text
    }

    const fieldDetailLen = props?.data?.FormFieldDetails?.length
    const widthPercent = fieldDetailLen ? 100 / fieldDetailLen : 100

    return (
        <FormItem
            name={data?.Name || "undefined"}
            label={data?.Title_Style || "undefined"}
            rules={rules}
        >
            <Radio.Group
                size='large'
                className='w-full flex'
                // defaultValue={defaultValue}
                buttonStyle="solid"
            >
                {props.data.FormFieldDetails?.map((value, index) => {
                    return (<>
                        <Radio.Button
                            key={index}
                            value={value.Text}
                            style={{ width: `${widthPercent}%` }}
                            className='flex items-center justify-center'
                        >
                            {value.Text}
                        </Radio.Button>
                    </>)
                })}
            </Radio.Group>
        </FormItem>
    );
};

export default RadioBtn;