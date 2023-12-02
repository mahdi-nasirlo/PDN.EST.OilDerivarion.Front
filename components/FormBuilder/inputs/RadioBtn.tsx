import React from 'react';
import {FormBuilderInputType} from "../index";
import {RadioButtonProps} from "antd/lib/radio/radioButton";
import FormItem from "../FormItem";
import {Radio} from "antd";
import {Rule} from "rc-field-form/es/interface";

interface PropsType {
    data: FormBuilderInputType
}


const RadioBtn = (props: RadioButtonProps & PropsType) => {

    const data = props?.data

    const rules: Rule[] = [
        {
            required: false
        }
    ]

    let defaultValue = null

    if (Array.isArray(props?.data?.FormFieldDetails) && props?.data?.FormFieldDetails[0]) {
        defaultValue = props?.data?.FormFieldDetails[0].Value
    }

    console.log(props.data.FormFieldDetails)


    return (
        <FormItem
            name={data.Name}
            label={data?.Title_Style}
            rules={rules}
        >
            <Radio.Group
                size='large'
                className='w-full'
                defaultValue={defaultValue}
                buttonStyle="solid"
            >
                {props.data.FormFieldDetails?.map((value, index) => (<>
                    <Radio.Button className='w-1/2' key={index} value={value.Value}>
                        {value.Text}
                    </Radio.Button>
                </>))}
            </Radio.Group>
        </FormItem>
    );
};

export default RadioBtn;