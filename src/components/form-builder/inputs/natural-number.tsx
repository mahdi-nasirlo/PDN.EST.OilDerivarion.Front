import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';


const NaturalNumber: React.FC<InputNumberProps> = ({ ...props }) => {



    return (
        <InputNumber
            maxLength={15}
            controls={false}
            className="w-full"
            size="large"
            placeholder='وارد کنید'
            // defaultValue={data?.Default_Value as any}
            {...props}
        />
    );
};

export default NaturalNumber;
