import React from 'react';
import { InputNumber as AntInputNumber, InputNumberProps } from "antd";


interface PropsType {
    data: any
}


const InputNumber = (props: InputNumberProps & PropsType) => {

    const { data } = props

    return (
        <AntInputNumber
            maxLength={15}
            controls={false}
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