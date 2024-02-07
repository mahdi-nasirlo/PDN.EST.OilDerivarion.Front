import React from 'react'
import { InputNumber as AntInputNumber, InputNumberProps } from "antd";


interface PropsType {
    data: any
}

const TemperatureInput = (props: InputNumberProps & PropsType) => {

    const { data } = props;

    return (
        <AntInputNumber
            controls={false}
            className="w-full"
            size="large"
            type="text"
            defaultValue={data?.Default_Value as any}
            placeholder={data?.Placeholder || "وارد کنید"}
            {...props}
        />
    )
}


export default TemperatureInput;