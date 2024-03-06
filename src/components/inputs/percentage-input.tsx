import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';

const PercentageInput: React.FC<InputNumberProps> = ({ value, onChange }) => {

    return (
        <InputNumber
            maxLength={15}
            controls={false}
            value={value}
            onChange={onChange}
            max={100}
            className="w-full"
            size="large"
            formatter={(value) => `${value}%`}
            placeholder='وارد کنید'
        />
    );
};

export default PercentageInput;
