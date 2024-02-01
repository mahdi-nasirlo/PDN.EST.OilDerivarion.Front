import React from 'react';
import {Radio} from "antd";
import {RadioGroupProps} from "antd/lib";

interface PropsType {
    data: any
}

const RadioBtn: React.FC<RadioGroupProps> = ({value, onChange, ...props}) => {
// const RadioBtn = (props: RadioButtonProps & PropsType) => {

    // const data = props?.data
    //
    // const rules: Rule[] = [
    //     {
    //         required: true,
    //         message: 'لطفا انتخاب کنید'
    //     }
    // ]
    //
    // let defaultValue = null
    //
    // if (Array.isArray(props?.data?.FormFieldDetails) && props?.data?.FormFieldDetails[0]) {
    //     defaultValue = props?.data?.FormFieldDetails[0].Text
    // }

    // const fieldDetailLen = props?.data?.FormFieldDetails?.length
    // const widthPercent = fieldDetailLen ? 100 / fieldDetailLen : 100

    return (
        <Radio.Group
            value={value}
            onChange={onChange}
            size='large'
            className='w-full'
            // defaultValue={defaultValue}
            options={[]}
            buttonStyle="solid"
            {...props}
        >
            {/*{props.data.FormFieldDetails?.map((value, index) => {*/}
            {/*    return (<>*/}
            {/*        <Radio.Button style={{width: `${widthPercent}%`}} key={index} value={value.Text}>*/}
            {/*                <span>*/}
            {/*                    {value.Text}*/}
            {/*                </span>*/}
            {/*        </Radio.Button>*/}
            {/*    </>)*/}
            {/*})}*/}
        </Radio.Group>
    );
};

export default RadioBtn;