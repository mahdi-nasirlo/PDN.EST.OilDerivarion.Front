import React from 'react';
import {Radio} from "antd";
import {CheckboxOptionType, RadioGroupProps} from "antd/lib";

interface PropsType {
    data: any
}

const RadioBtn: React.FC<RadioGroupProps> = ({value, onChange, ...props}) => {

    const fieldDetailLen = props?.options?.length
    const widthPercent = fieldDetailLen ? 100 / fieldDetailLen : 100

    return (
        <Radio.Group
            value={value}
            onChange={onChange}
            size='large'
            className='w-full flex justify-start'
            // defaultValue={defaultValue}
            optionType={"button"}
            buttonStyle="solid"
            {...props}
            options={[]}
        >
            {props.options?.map((value, index) => <Radio.Button
                style={{width: `${widthPercent}%`}}
                value={(value as CheckboxOptionType).label}
                key={index}
            >
                {(value as CheckboxOptionType).label}
            </Radio.Button>)
            }
        </Radio.Group>
    );
};

export default RadioBtn;