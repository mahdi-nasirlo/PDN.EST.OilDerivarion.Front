import React from 'react';
import {InputProps} from "antd/lib";
import {Input} from "antd";


interface PropsType {
    data: any
}


const InputNumber = (props: InputProps & PropsType) => {

    const {data} = props

    return (
        <Input
            className="w-full"
            size="large"
            type="text"
            defaultValue={data?.Default_Value as any}
            placeholder={data?.Placeholder || "وارد کنید"}
            {...props}
        />
    );
};

export default InputNumber;